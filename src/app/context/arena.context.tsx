'use client';
import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { usePokemon } from '../hooks/usePokemon';
import {
  getMoveEffectivinesInfo,
  getMostEffectiveMove,
  getRemainingHP,
} from '../lib/pokemon-moves-types-relationship';
import { ArenaPokemon, MoveDetail, Pokemon } from '../models/pokemon-model';
import { wait } from '../lib/arena.utils';

type ArenaContextType = {
  arenaData: ArenaData;
  isLoading: boolean;
  setMove: (move: MoveDetail) => void;
  chosenMoves: ChosenMovesType;
};

export interface ArenaData {
  myPokemon: ArenaPokemon;
  rivalPokemon: ArenaPokemon;
  isOver: boolean;
  turnOrder: [ArenaPokemonKeys, ArenaPokemonKeys];
  isTurnOver: boolean;
}

export type ArenaPokemonKeys = 'myPokemon' | 'rivalPokemon';

type ChosenMovesType = {
  [key in ArenaPokemonKeys]: MoveDetail;
};

export const ArenaContext = createContext<ArenaContextType | undefined>(undefined);

export function ArenaProvider({ children }: { children: ReactNode }) {
  const { pokemons, isLoading } = usePokemon();
  const [arenaData, setArenaData] = useState<ArenaData>({} as ArenaData);
  const [chosenMoves, setChosenMove] = useState<ChosenMovesType>({} as ChosenMovesType);

  const setMove = (move: MoveDetail) => {
    if (!arenaData.isTurnOver || arenaData.isOver) return;
    const currentTurnMoces = {
      myPokemon: move,
      rivalPokemon: getMostEffectiveMove(
        arenaData.rivalPokemon.arenaMoves,
        arenaData.myPokemon.processedTypes
      ),
    };

    setChosenMove(currentTurnMoces);
    attack(currentTurnMoces);
  };

  useEffect(() => {
    if (pokemons) {
      const myPokemon = initiatePokemonForArena(pokemons[0]);
      const rivalPokemon = initiatePokemonForArena(pokemons[1]);
      setArenaData({
        myPokemon,
        rivalPokemon,
        isOver: false,
        turnOrder: ['myPokemon', 'rivalPokemon'],
        isTurnOver: true,
      });
    }
  }, [pokemons]);

  const isGameOver = (attackedPokemonHP: number) => {
    const isOver = attackedPokemonHP <= 0;
    if (isOver) {
      setArenaData((prev) => ({
        ...prev,
        isOver: true,
        isTurnOver: true,
      }));
    }
    return isOver;
  };

  const attack = async (moves: ChosenMovesType) => {
    let localIsGameOver = false;

    for (const currentAtackerKey of arenaData.turnOrder) {
      if (localIsGameOver) break;

      const nonAttackingPokemon: { [key in ArenaPokemonKeys]: ArenaPokemonKeys } = {
        myPokemon: 'rivalPokemon',
        rivalPokemon: 'myPokemon',
      };

      const currentHealth = getRemainingHP({
        pokemonHP: arenaData[nonAttackingPokemon[currentAtackerKey]].currentHealth,
        receivedAttackEffectivinessIndex: getMoveEffectivinesInfo(
          moves[currentAtackerKey].type.name,
          arenaData[nonAttackingPokemon[currentAtackerKey]].processedTypes[0]
        ).value,
        attackerBasePower: arenaData[currentAtackerKey].power,
        attacksPower: moves[currentAtackerKey].power,
      });

      setArenaData((prev) => ({
        ...prev,
        [currentAtackerKey]: {
          ...prev[currentAtackerKey],
          status: 'attacking',
        },
        isTurnOver: false,
      }));
      await wait(1000);
      // This is not wokring REVISE
      if (currentHealth <= 0) {
        setArenaData((prev) => ({
          ...prev,
          [nonAttackingPokemon[currentAtackerKey]]: {
            ...prev[nonAttackingPokemon[currentAtackerKey]],
            status: 'dead',
          },
        }));
      }
      await wait(1000);

      setArenaData((prev) => ({
        ...prev,
        [nonAttackingPokemon[currentAtackerKey]]: {
          ...prev[nonAttackingPokemon[currentAtackerKey]],
          currentHealth,
          currentPercentageHealth: `${(
            (currentHealth / prev[nonAttackingPokemon[currentAtackerKey]].hp) *
            100
          ).toString()}%`,
        },
        [currentAtackerKey]: {
          ...prev[currentAtackerKey],
          status: 'idle',
        },
      }));

      localIsGameOver = isGameOver(currentHealth);
    }
    setArenaData((prev) => ({
      ...prev,
      isTurnOver: true,
    }));
  };

  return (
    <ArenaContext.Provider value={{ arenaData, isLoading, setMove, chosenMoves }}>
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
});
