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
    // Get here the other pokemon move
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

  useEffect(() => {
    if (arenaData.myPokemon && arenaData.rivalPokemon) {
      isGameOver();
    }
  }, [arenaData.myPokemon?.currentHealth, arenaData.rivalPokemon?.currentHealth]);

  const isGameOver = () => {
    if (arenaData.myPokemon.currentHealth <= 0 || arenaData.rivalPokemon.currentHealth <= 0) {
      setArenaData((prev) => ({
        ...prev,
        isOver: true,
      }));
    }
  };

  const attack = async (moves: ChosenMovesType) => {
    // Update the HP of the pokemons in order
    for (const currentAtackerKey of arenaData.turnOrder) {
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

      // Set the status to 'attacking' before the animation
      setArenaData((prev) => ({
        ...prev,
        [currentAtackerKey]: {
          ...prev[currentAtackerKey],
          status: 'attacking',
        },
      }));
      await wait(1000); // Wait for the animation to complete

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
    }
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
