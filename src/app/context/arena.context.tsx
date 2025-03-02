'use client';
import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { usePokemon } from '../hooks';
import {
  getMostEffectiveMove,
  getTurnOrder,
  initiatePokemonForArena,
  updatePokemonHealth,
} from '../lib';
import { ArenaData, MoveDetail, Pokemon } from '../models';
import { useInfoBoxMessage } from '../hooks/useInfoBoxMessage';
import { createBattleFlow } from '../models/battleFlow';
import { useUsersIds } from '../hooks/useUsersIds';
import { useGameLoop } from '../hooks/useGameLoop';

type ArenaContextType = {
  arenaData: ArenaData;
  isLoading: boolean;
  chooseMove: (move: MoveDetail) => void;
  userId: string;
  rivalId: string;
  infoBoxMessage: string;
};

export const ArenaContext = createContext<ArenaContextType | undefined>(undefined);

export function ArenaProvider({ children }: { children: ReactNode }) {
  const { userId, rivalId, createLocalIds } = useUsersIds();
  const { data: pokemons, isLoading } = usePokemon();
  const [arenaData, setArenaData] = useState<ArenaData>({} as ArenaData);
  const { infoBoxMessage, setInfoBoxMessage } = useInfoBoxMessage();

  const initializeArena = (pokemons: Pokemon[]) => {
    const { newUserId, newRivalId } = createLocalIds();
    const arenaPokemons = {
      [newUserId]: initiatePokemonForArena(pokemons[0]),
      [newRivalId]: initiatePokemonForArena(pokemons[1]),
    };
    updateArenaData({
      users: [newUserId, newRivalId],
      pokemons: arenaPokemons,
      isOver: false,
      turnOrder: getTurnOrder(arenaPokemons),
      isTurnOver: true,
      isArenaReady: true,
    });
  };

  const updateArenaData = (updates: Partial<ArenaData>) => {
    setArenaData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const chooseMove = (move: MoveDetail) => {
    setArenaData((prev) => ({
      ...prev,
      isTurnOver: false,
    }));
    const rivalMove = getMostEffectiveMove(
      arenaData.pokemons[rivalId].arenaMoves,
      arenaData.pokemons[userId].processedTypes
    );
    const updatedArenaData: ArenaData = {
      ...arenaData,
      chosenMoves: {
        [userId]: move,
        [rivalId]: rivalMove,
      },
      pokemons: {
        [userId]: updatePokemonHealth(
          arenaData.pokemons[userId],
          arenaData.pokemons[rivalId],
          rivalMove,
          arenaData,
          userId
        ),
        [rivalId]: updatePokemonHealth(
          arenaData.pokemons[rivalId],
          arenaData.pokemons[userId],
          move,
          arenaData,
          rivalId
        ),
      },
    };

    const battleFlow = createBattleFlow(userId, rivalId, updatedArenaData);
    gameLoop({ ...updatedArenaData, battleFlow });
  };

  useEffect(() => {
    if (pokemons) {
      initializeArena(pokemons);
    }
  }, [pokemons]);

  const gameOver = () => {
    updateArenaData({
      isOver: true,
      isTurnOver: true,
    });
  };

  const { gameLoop } = useGameLoop({
    gameOver,
    setInfoBoxMessage,
    updateArenaData: setArenaData,
  });

  return (
    <ArenaContext.Provider
      value={{ arenaData, isLoading, chooseMove, userId, rivalId, infoBoxMessage }}
    >
      {children}
    </ArenaContext.Provider>
  );
}

export const useArenaContext = () => {
  const context = useContext(ArenaContext);
  if (!context) {
    throw new Error('useArenaContext must be used within an ArenaProvider');
  }
  return context;
};
