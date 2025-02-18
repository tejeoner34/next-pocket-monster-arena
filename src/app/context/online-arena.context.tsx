'use client';
import { createContext } from 'react';
import { useMultiplayerContext } from '../hooks';
import { OnlineArenaDataType } from '../models';

type OnlineArenaContextType = {
  onlineArenaData: OnlineArenaDataType;
};

export const OnlineArenaContext = createContext<undefined | OnlineArenaContextType>(undefined);

export const OnlineArenaProvider = ({ children }: { children: React.ReactNode }) => {
  const { onlineArenaData, updateOnlineArenaData } = useMultiplayerContext();

  const initateOnlineArena = (roomId: string) => {
    updateOnlineArenaData({
      roomId,
      users: [],
      usersMoves: [],
      usersDoneWithTurn: [],
      usersTurn: [],
    });
  };

  return (
    <OnlineArenaContext.Provider value={{ onlineArenaData }}>
      {children}
    </OnlineArenaContext.Provider>
  );
};
