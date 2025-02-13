'use client';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { socket } from '../api';
import {
  ChallengerDataType,
  ChallengeRequestStatus,
  ChallengeResponseType,
  ReceiveChallengeType,
  REQUEST_STATUSES,
} from '../models';

type SocketIoContextType = {
  acceptChallenge: () => void;
  challengerId: ChallengerDataType['challengerId'];
  challengeUser: ({ challengerId, rivalId }: { challengerId: string; rivalId: string }) => void;
  declineChallenge: () => void;
  emit: <T>(eventName: string, data: T) => void;
  onlineId: string;
  challengeRequestStatus: ChallengeRequestStatus;
};

const socketActions = {
  getUserId: 'get-user-id',
  joinRoom: 'join-room',
  leaveRoom: 'leave-room',
  challengeUser: 'challenge-user',
  disconnect: 'disconnect',
  challengeResponse: 'challenge-response',
};

const socketResponses = {
  connect: 'connect',
  receiveChallenge: 'receive-challenge',
  challengeResponse: 'challenge-response',
  challengeRejected: 'challenge-rejected',
};

const defaultRequestStatus: ChallengeRequestStatus = {
  status: REQUEST_STATUSES.PENDING,
  isSent: false,
};

export const MultiplayerContext = createContext<undefined | SocketIoContextType>(undefined);

export const MultiplayerProvider = ({ children }: { children: ReactNode }) => {
  const [onlineId, setOnlineId] = useState<string>('');
  const [challengerId, setChallengerId] = useState<ChallengerDataType['challengerId']>('');
  const [challengeRequestStatus, setChallengeRequestStatus] =
    useState<ChallengeRequestStatus>(defaultRequestStatus);

  const emit = <T,>(eventName: string, data: T) => {
    socket.emit(eventName, data);
  };

  const challengeUser = ({ challengerId, rivalId }: { challengerId: string; rivalId: string }) => {
    setChallengeRequestStatus({ status: REQUEST_STATUSES.PENDING, isSent: true });
    emit(socketActions.challengeUser, { challengerId, rivalId });
  };

  const resetChallengerData = () => {
    setChallengerId('');
  };

  const declineChallenge = () => {
    //TODO: emit challenge response to server
    emit(socketActions.challengeResponse, { userId: onlineId, accept: false, challengerId });
    resetChallengerData();
  };

  const acceptChallenge = () => {
    //TODO: emit challenge response to server
    emit(socketActions.challengeResponse, { ok: true, accept: true, message: 'Accepted' });
    // Create a new room
    // Join the room
    // Navigate to the arena page
  };

  useEffect(() => {
    console.log('Connecting to socket.io', socket.id);
    if (socket.id) setOnlineId(socket.id);

    socket.on(socketResponses.connect, () => {
      console.log('Socket connected', socket.id);
      setOnlineId(socket.id || '');
    });

    socket.on(socketResponses.receiveChallenge, (data: ReceiveChallengeType) => {
      console.log('RECEIVE CHALLENGE', data);
      setChallengerId(data.challengerId);
    });

    socket.on(socketResponses.challengeResponse, (data: ChallengeResponseType) => {
      console.log('CHALLENGE RESPONSE', data);
    });

    socket.on(socketResponses.challengeRejected, (data: ChallengeResponseType) => {
      console.log('CHALLENGE REJECTED', data);
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
        onlineId,
      }}
    >
      {children}
    </MultiplayerContext.Provider>
  );
};
