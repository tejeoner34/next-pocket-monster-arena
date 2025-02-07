'use client';
import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { usePokemon } from '../hooks/usePokemon';
import {
  getMoveEffectivinesInfo,
  getMostEffectiveMove,
  getRemainingHP,
} from '../lib/pokemon-moves-types-relationship';
import { ArenaPokemon, MoveDetail, Pokemon } from '../models/pokemon-model';

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

  const isGameOver = () => {
    if (arenaData.myPokemon.hp <= 0 || arenaData.rivalPokemon.hp <= 0) {
      setArenaData((prev) => ({
        ...prev,
        isOver: true,
      }));
    }
  };

  const attack = (moves: ChosenMovesType) => {
    const { myPokemon, rivalPokemon } = moves;
    // TODO: Implement attack logic
    const myPokemonMoveDamageInfo = getMoveEffectivinesInfo(
      myPokemon.type.name,
      arenaData.rivalPokemon.processedTypes[0]
    );

    const rivalPokemonMoveDamageInfo = getMoveEffectivinesInfo(
      rivalPokemon.type.name,
      arenaData.myPokemon.processedTypes[0]
    );

    // Calculate the damage
    const myPokemonsRemainingHP = getRemainingHP({
      pokemonHP: arenaData.myPokemon.hp,
      receivedAttackEffectivinessIndex: rivalPokemonMoveDamageInfo.value,
      attackerBasePower: arenaData.rivalPokemon.power,
      attacksPower: rivalPokemon.power,
    });
    const rivalPokemonsRemainingHP = getRemainingHP({
      pokemonHP: arenaData.rivalPokemon.hp,
      receivedAttackEffectivinessIndex: myPokemonMoveDamageInfo.value,
      attackerBasePower: arenaData.myPokemon.power,
      attacksPower: myPokemon.power,
    });

    // Update the HP of the pokemons in order
    arenaData.turnOrder.forEach((pokemonKey) => {
      const currentHealth =
        pokemonKey === 'myPokemon' ? rivalPokemonsRemainingHP : myPokemonsRemainingHP;

      setArenaData((prev) => ({
        ...prev,
        [pokemonKey]: {
          ...prev[pokemonKey],
          currentHealth,
          currentPercentageHealth: `${((currentHealth / prev[pokemonKey].hp) * 100).toString()}%`,
        },
      }));
      // async problem. Either way we have to force wait to create animations
      isGameOver();
    });
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
});
