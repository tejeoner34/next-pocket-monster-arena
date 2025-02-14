'use client';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { socket } from '../api';
import {
  AcceptedChallengeResponseType,
  ChallengerDataType,
  ChallengeRequestStatus,
  OnlineArenaData,
  ReceiveChallengeType,
  REQUEST_STATUSES,
  SOCKET_ACTIONS,
  SOCKET_RESPONSES,
} from '../models';

type SocketIoContextType = {
  acceptChallenge: () => void;
  challengeRequestStatus: ChallengeRequestStatus;
  challengerId: ChallengerDataType['challengerId'];
  challengeUser: ({ challengerId, rivalId }: { challengerId: string; rivalId: string }) => void;
  declineChallenge: () => void;
  emit: <T>(eventName: string, data: T) => void;
  onlineArenaData: OnlineArenaData;
  onlineId: string;
};

const defaultRequestStatus: ChallengeRequestStatus = {
  status: REQUEST_STATUSES.PENDING,
  isSent: false,
};

export const MultiplayerContext = createContext<undefined | SocketIoContextType>(undefined);

export const MultiplayerProvider = ({ children }: { children: ReactNode }) => {
  const [onlineId, setOnlineId] = useState<string>('');
  const [challengerId, setChallengerId] = useState<ChallengerDataType['challengerId']>('');
  const [onlineArenaData, setOnlineArenaData] = useState<OnlineArenaData>({} as OnlineArenaData);
  const [challengeRequestStatus, setChallengeRequestStatus] =
    useState<ChallengeRequestStatus>(defaultRequestStatus);
  const router = useRouter();

  const emit = <T,>(eventName: string, data: T) => {
    socket.emit(eventName, data);
  };

  const challengeUser = ({ challengerId, rivalId }: { challengerId: string; rivalId: string }) => {
    setChallengeRequestStatus({ status: REQUEST_STATUSES.PENDING, isSent: true });
    emit(SOCKET_ACTIONS.challengeUser, { challengerId, rivalId });
  };

  const resetChallengerData = () => {
    setChallengerId('');
  };

  const declineChallenge = () => {
    emit(SOCKET_ACTIONS.challengeResponse, { userId: onlineId, accept: false, challengerId });
    resetChallengerData();
  };

  const acceptChallenge = () => {
    emit(SOCKET_ACTIONS.challengeResponse, { userId: onlineId, accept: true, challengerId });
  };

  useEffect(() => {
    if (socket.id) setOnlineId(socket.id);

    socket.on(SOCKET_RESPONSES.connect, () => {
      setOnlineId(socket.id || '');
    });

    socket.on(SOCKET_RESPONSES.receiveChallenge, (data: ReceiveChallengeType) => {
      setChallengerId(data.challengerId);
    });

    socket.on(SOCKET_RESPONSES.challengeAccepted, (data: AcceptedChallengeResponseType) => {
      router.push('/arena/multiplayer-arena');
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
        challengerId,
        challengeUser,
        declineChallenge,
        emit,
        onlineArenaData,
        onlineId,
      }}
    >
      {children}
    </MultiplayerContext.Provider>
  );
};
