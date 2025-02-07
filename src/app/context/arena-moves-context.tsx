'use client';
import { createContext, ReactNode, useContext, useState } from 'react';
import { MoveDetail } from '../models/pokemon-model';
import { ArenaPokemonKeys } from './arena.context';

type ChosenMovesType = {
  [key in ArenaPokemonKeys]: MoveDetail;
};

type ArenaMovesContextType = {
  setMove: (move: MoveDetail) => void;
  chosenMoves: ChosenMovesType | undefined;
};

export const ArenaMovesContext = createContext<undefined | ArenaMovesContextType>(undefined);

export function ArenaMovesProvider({ children }: { children: ReactNode }) {
  const [chosenMoves, setChosenMove] = useState<ChosenMovesType | undefined>(undefined);

  const setMove = (move: MoveDetail) => {
    // Get here the other pokemon move
    const currentTurnMoces = {
      myPokemon: move,
      rivalPokemon: move,
    };

    setChosenMove(currentTurnMoces);
  };

  const value = {
    setMove: setMove,
    chosenMoves,
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
