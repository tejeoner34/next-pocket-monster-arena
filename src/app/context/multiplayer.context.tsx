'use client';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { socket } from '../api';
import {
  AcceptedChallengeResponseType,
  ChallengerDataType,
  ChallengeRequestStatus,
  OnlineArenaDataType,
  ReceiveChallengeType,
  REQUEST_STATUSES,
  SOCKET_ACTIONS,
  SOCKET_RESPONSES,
} from '../models';

type SocketIoContextType = {
  acceptChallenge: () => void;
  challengeRequestStatus: ChallengeRequestStatus;
  rivalId: ChallengerDataType['challengerId'];
  challengeUser: ({ challengerId, rivalId }: { challengerId: string; rivalId: string }) => void;
  declineChallenge: () => void;
  emit: <T>(eventName: string, data: T) => void;
  onlineArenaData: OnlineArenaDataType;
  onlineId: string;
  updateOnlineArenaData: (updates: Partial<OnlineArenaDataType>) => void;
  receivedChallenge: ReceiveChallengeType;
};

const defaultRequestStatus: ChallengeRequestStatus = {
  status: REQUEST_STATUSES.PENDING,
  isSent: false,
};

export const MultiplayerContext = createContext<undefined | SocketIoContextType>(undefined);

export const MultiplayerProvider = ({ children }: { children: ReactNode }) => {
  const [onlineId, setOnlineId] = useState<string>('');
  const [rivalId, setRivalId] = useState<ChallengerDataType['challengerId']>('');
  const [receivedChallenge, setReceivedChallenge] = useState<ReceiveChallengeType>(
    {} as ReceiveChallengeType
  );
  const [onlineArenaData, setOnlineArenaData] = useState<OnlineArenaDataType>(
    {} as OnlineArenaDataType
  );
  const [challengeRequestStatus, setChallengeRequestStatus] =
    useState<ChallengeRequestStatus>(defaultRequestStatus);
  const router = useRouter();

  const updateOnlineArenaData = (updates: Partial<OnlineArenaDataType>) => {
    setOnlineArenaData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const emit = <T,>(eventName: string, data: T) => {
    socket.emit(eventName, data);
  };

  const challengeUser = ({ challengerId, rivalId }: { challengerId: string; rivalId: string }) => {
    setChallengeRequestStatus({ status: REQUEST_STATUSES.PENDING, isSent: true });
    setRivalId(rivalId);
    emit(SOCKET_ACTIONS.challengeUser, { challengerId, rivalId });
  };

  const resetChallengerData = () => {
    setRivalId('');
  };

  const declineChallenge = () => {
    emit(SOCKET_ACTIONS.challengeResponse, { userId: onlineId, accept: false, rivalId });
    resetChallengerData();
  };

  const acceptChallenge = () => {
    console.log(onlineId, rivalId);
    emit(SOCKET_ACTIONS.challengeResponse, { userId: onlineId, accept: true, rivalId });
  };

  useEffect(() => {
    if (socket.id) setOnlineId(socket.id);
    console.log('SOCKET ID OUT OF CONECT', socket.id);

    socket.on('connect', () => {
      console.log('IN CONNECT', socket.id);
      setOnlineId(socket.id || '');
    });

    socket.on(SOCKET_RESPONSES.receiveChallenge, (data: ReceiveChallengeType) => {
      setRivalId(data.challengerId);
      setReceivedChallenge(data);
    });

    socket.on(SOCKET_RESPONSES.challengeAccepted, (data: AcceptedChallengeResponseType) => {
      console.log('CHALLENGE ACCEPTED', data.room);
      router.push('/online-arena/arena');
      setOnlineArenaData(data.room);
    });

    socket.on(SOCKET_RESPONSES.noUserFound, () => {
      setChallengeRequestStatus((prev) => ({ ...prev, status: REQUEST_STATUSES.NO_USER }));
    });

    socket.on(SOCKET_RESPONSES.challengeRejected, () => {
      setChallengeRequestStatus((prev) => ({ ...prev, status: REQUEST_STATUSES.REJECTED }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <MultiplayerContext.Provider
      value={{
        acceptChallenge,
        challengeRequestStatus,
        rivalId,
        challengeUser,
        declineChallenge,
        emit,
        onlineArenaData,
        onlineId,
        updateOnlineArenaData,
        receivedChallenge,
      }}
    >
      {children}
    </MultiplayerContext.Provider>
  );
};
