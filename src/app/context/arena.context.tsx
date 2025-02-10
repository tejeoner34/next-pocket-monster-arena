'use client';
import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { usePokemon } from '../hooks';
import { ArenaPokemon, arenaPokemonStatus, MoveDetail, Pokemon } from '../models/pokemon-model';
import {
  infoBoxMessageValues,
  getMoveEffectivinesInfo,
  getMostEffectiveMove,
  getRemainingHP,
  wait,
} from '../lib';

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
  message: string;
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

  const updateArenaData = (updates: Partial<ArenaData>) => {
    setArenaData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const updatePokemonData = (key: ArenaPokemonKeys, updates: Partial<ArenaPokemon>) => {
    setArenaData((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        ...updates,
      },
    }));
  };

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
      updateArenaData({
        myPokemon,
        rivalPokemon,
        isOver: false,
        turnOrder: ['myPokemon', 'rivalPokemon'],
        isTurnOver: true,
        message: '',
      });
    }
  }, [pokemons]);

  const isGameOver = (attackedPokemonHP: number) => {
    const isOver = attackedPokemonHP <= 0;
    if (isOver) {
      updateArenaData({
        isOver: true,
        isTurnOver: true,
      });
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
      console.log('entre turnos', currentHealth, moves[currentAtackerKey]);
      updateArenaData({
        message: infoBoxMessageValues.getAttackerPlusMoveName(
          moves[currentAtackerKey].name,
          arenaData[currentAtackerKey].name
        ),
        isTurnOver: false,
        [currentAtackerKey]: {
          ...arenaData[currentAtackerKey],
          status: arenaPokemonStatus.attacking,
        },
      });
      await wait(1000);

      updatePokemonData(nonAttackingPokemon[currentAtackerKey], {
        status: arenaPokemonStatus.stunned,
      });

      updatePokemonData(nonAttackingPokemon[currentAtackerKey], {
        currentHealth,
        currentPercentageHealth: `${(
          (currentHealth / arenaData[nonAttackingPokemon[currentAtackerKey]].hp) *
          100
        ).toString()}%`,
      });

      updatePokemonData(currentAtackerKey, { status: arenaPokemonStatus.idle });

      if (currentHealth <= 0) {
        updatePokemonData(nonAttackingPokemon[currentAtackerKey], {
          status: arenaPokemonStatus.defeated,
        });
      }
      await wait(1000);

      updatePokemonData(nonAttackingPokemon[currentAtackerKey], {
        status: arenaPokemonStatus.idle,
      });

      localIsGameOver = isGameOver(currentHealth);
    }
    updateArenaData({ isTurnOver: true });
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
