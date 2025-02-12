'use client';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { socket } from '../api';
import { ChallengerDataType, ChallengeResponseType, ReceiveChallengeType } from '../models';

type SocketIoContextType = {
  acceptChallenge: () => void;
  challengerId: ChallengerDataType['challengerId'];
  challengeUser: ({ challengerId, rivalId }: { challengerId: string; rivalId: string }) => void;
  declineChallenge: () => void;
  emit: <T>(eventName: string, data: T) => void;
  onlineId: string;
};

const socketActions = {
  getUserId: 'get-user-id',
  joinRoom: 'join-room',
  leaveRoom: 'leave-room',
  challengeUser: 'challenge-user',
  connect: 'connect',
  disconnect: 'disconnect',
  receiveChallenge: 'receive-challenge',
  challengeResponse: 'challenge-response',
};

export const MultiplayerContext = createContext<undefined | SocketIoContextType>(undefined);

export const MultiplayerProvider = ({ children }: { children: ReactNode }) => {
  const [onlineId, setOnlineId] = useState<string>('');
  const [challengerId, setChallengerId] = useState<ChallengerDataType['challengerId']>('');

  const emit = <T,>(eventName: string, data: T) => {
    socket.emit(eventName, data);
  };

  const challengeUser = ({ challengerId, rivalId }: { challengerId: string; rivalId: string }) => {
    emit(socketActions.challengeUser, { challengerId, rivalId });
  };

  const resetChallengerData = () => {
    setChallengerId('');
  };

  const declineChallenge = () => {
    //TODO: emit challenge response to server
    emit(socketActions.challengeResponse, { ok: false, accept: false, message: 'Declined' });
    resetChallengerData();
  };

  const acceptChallenge = () => {
    //TODO: emit challenge response to server
    emit(socketActions.challengeResponse, { ok: true, accept: true, message: 'Accepted' });
  };

  useEffect(() => {
    console.log('Connecting to socket.io', socket.id);
    if (socket.id) setOnlineId(socket.id);

    socket.on(socketActions.connect, () => {
      console.log('Socket connected', socket.id);
      setOnlineId(socket.id || '');
    });

    socket.on(socketActions.receiveChallenge, (data: ReceiveChallengeType) => {
      console.log('RECEIVE CHALLENGE', data);
      setChallengerId(data.challengerId);
    });

    socket.on(socketActions.challengeResponse, (data: ChallengeResponseType) => {
      console.log('CHALLENGE RESPONSE', data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <MultiplayerContext.Provider
      value={{ challengerId, onlineId, acceptChallenge, emit, challengeUser, declineChallenge }}
    >
      {children}
    </MultiplayerContext.Provider>
  );
};
