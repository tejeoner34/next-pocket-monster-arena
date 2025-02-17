'use client';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { socket } from '../api';

type SocketIoContextType = {
  onlineId: string;
  emit: <T>(eventName: string, data: T) => void;
  challengeUser: ({ challengerId, rivalId }: { challengerId: string; rivalId: string }) => void;
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

export const SocketIoContext = createContext<undefined | SocketIoContextType>(undefined);

export const SocketIoProvider = ({ children }: { children: ReactNode }) => {
  const [onlineId, setOnlineId] = useState<string>('');

  const emit = <T,>(eventName: string, data: T) => {
    socket.emit(eventName, data);
  };

  const challengeUser = ({ challengerId, rivalId }: { challengerId: string; rivalId: string }) => {
    emit(socketActions.challengeUser, { challengerId, rivalId });
  };

  useEffect(() => {
    console.log('Connecting to socket.io', socket.id);
    if (socket.id) setOnlineId(socket.id);

    socket.on(socketActions.connect, () => {
      console.log('Socket connected', socket.id);
      setOnlineId(socket.id || '');
    });

    socket.on(socketActions.receiveChallenge, (data: string) => {
      console.log('RECEIVE CHALLENGE', data);
    });

    socket.on(socketActions.challengeResponse, (data: string) => {
      console.log('CHALLENGE RESPONSE', data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketIoContext.Provider value={{ onlineId, emit, challengeUser }}>
      {children}
    </SocketIoContext.Provider>
  );
};
