'use client';
import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { usePokemon } from '../hooks';
import {
  getMostEffectiveMove,
  getTurnOrder,
  modifyPokemonHealth,
  updatePokemonHealth,
  updatePokemonStatus,
} from '../lib';
import { ArenaData, ArenaPokemon, MoveDetail, Pokemon, ReceivedMoveDetail } from '../models';
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
  const { userId, rivalId, setUserId, setRivalId } = useUsersIds();
  const { data: pokemons, isLoading } = usePokemon();
  const [arenaData, setArenaData] = useState<ArenaData>({} as ArenaData);
  const { infoBoxMessage, setInfoBoxMessage } = useInfoBoxMessage();

  const updateArenaData = (updates: Partial<ArenaData>) => {
    setArenaData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const chooseMove = (move: MoveDetail) => {
    console.log('MOVE', move);
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
      const createRandomId = () => {
        const id = Math.random().toString(36).substring(2, 15);
        return id;
      };
      const newUserId = createRandomId();
      const newRivalId = createRandomId();
      setUserId(newUserId);
      setRivalId(newRivalId);
      const myPokemon = initiatePokemonForArena(pokemons[0]);
      const rivalPokemon = initiatePokemonForArena(pokemons[1]);
      const arenaPokemons = {
        [newUserId]: myPokemon,
        [newRivalId]: rivalPokemon,
      };
      updateArenaData({
        users: [newUserId, newRivalId],
        pokemons: arenaPokemons,
        isOver: false,
        turnOrder: getTurnOrder(arenaPokemons),
        isTurnOver: true,
        isArenaReady: true,
      });
    }
  }, [pokemons]);

  const attack = (
    pokemonName: ArenaPokemon['name'],
    moveName: MoveDetail['name'],
    attacker: string
  ) => {
    setInfoBoxMessage({
      type: 'attack',
      pokemonName,
      moveName,
    });
    setArenaData((prev) => updatePokemonStatus('attacking', attacker, prev));
  };

  const receiveDamage = (receiver: string) => {
    setArenaData((prev) => updatePokemonStatus('stunned', receiver, prev));
  };

  const updateHealthBar = (receiver: string, newData: ArenaData) => {
    setArenaData((prev) => modifyPokemonHealth(prev, newData, receiver));
  };

  const gameOver = () => {
    updateArenaData({
      isOver: true,
      isTurnOver: true,
    });
  };

  const { gameLoop } = useGameLoop({
    attack,
    gameOver,
    receiveDamage,
    setInfoBoxMessage,
    updateHealthBar,
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

const initiatePokemonForArena = (pokemon: Pokemon): ArenaPokemon => ({
  ...pokemon,
  currentHealth: pokemon.hp,
  currentPercentageHealth: '100%',
  isAlive: true,
  status: 'idle',
  receivedAttackData: {} as ReceivedMoveDetail,
});
