'use client';
import { createContext, ReactNode, useContext, useState } from 'react';
import { MoveDetail } from '../models/pokemon-model';

type ArenaMovesContextType = {
  setMove: (move: MoveDetail) => void;
  chosenMove: MoveDetail | undefined;
};

export const ArenaMovesContext = createContext<undefined | ArenaMovesContextType>(undefined);

export function ArenaMovesProvider({ children }: { children: ReactNode }) {
  const [chosenMove, setChosenMove] = useState<MoveDetail | undefined>(undefined);

  const setMove = (move: MoveDetail) => {
    setChosenMove(move);
  };

  const value = {
    setMove: setMove,
    chosenMove: chosenMove,
  };

  return <ArenaMovesContext.Provider value={value}>{children}</ArenaMovesContext.Provider>;
}

export const useArenaMovesContext = () => {
  const context = useContext(ArenaMovesContext);
  if (!context) {
    throw new Error('useTheme must be used withing a Themeprovider');
  }
  return context;
};
