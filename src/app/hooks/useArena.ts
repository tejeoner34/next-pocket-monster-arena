import { useEffect, useState } from 'react';
import { Pokemon, ArenaPokemon } from '../models/pokemon-model';
import { usePokemon } from './usePokemon';
import { useArenaMovesContext } from '../context/arena-moves-context';
import {
  getMostEffectiveMove,
  getMoveEffectivinesInfo,
  getRemainingHP,
} from '../lib/pokemon-moves-types-relationship';
import { getFasterPokemon } from '../lib/arena.utils';

interface ArenaData {
  myPokemon: ArenaPokemon;
  rivalPokemon: ArenaPokemon;
  isOver: boolean;
  turnOrder: ArenaPokemon[];
  isTurnOver: boolean;
}

export function useArena() {
  const { pokemons, isLoading } = usePokemon();
  const [arenaData, setArenaData] = useState<ArenaData>({} as ArenaData);
  const { chosenMove } = useArenaMovesContext();

  const attack = () => {
    // TODO: Implement attack logic
  };

  const gameLoop = () => {
    // Game loop
    console.log(arenaData);
    const myPokemonMoveDamageInfo = getMoveEffectivinesInfo(
      chosenMove!.type.name,
      arenaData.rivalPokemon.processedTypes[0]
    );
    const rivalPokemonMoveDamageInfo = getMostEffectiveMove(
      arenaData.rivalPokemon.arenaMoves,
      arenaData.myPokemon.processedTypes
    );

    console.log(myPokemonMoveDamageInfo, rivalPokemonMoveDamageInfo);

    // Calculate the damage
    const myPokemonsRemainingHP = getRemainingHP({
      pokemonHP: arenaData.myPokemon.hp,
      receivedAttackEffectivinessIndex: rivalPokemonMoveDamageInfo.effectiveness.value,
      attackerBasePower: arenaData.rivalPokemon.power,
      attacksPower: rivalPokemonMoveDamageInfo.move.power,
    });
    const rivalPokemonsRemainingHP = getRemainingHP({
      pokemonHP: arenaData.rivalPokemon.hp,
      receivedAttackEffectivinessIndex: myPokemonMoveDamageInfo.value,
      attackerBasePower: arenaData.myPokemon.power,
      attacksPower: chosenMove!.power,
    });

    console.log(
      'my pokemons remaining hp',
      myPokemonsRemainingHP,
      'rival pokemon remaining hp',
      rivalPokemonsRemainingHP
    );

    // Execute damage
  };

  useEffect(() => {
    // Things to set when the arena is mounted:
    // 1. Set the arena data
    // 2. Set which pokemon is faster (compare speed stat and add property to pokemon)
    // Need a variable that indicates if the turn is over
    // Create the game loop (logic to substract pokemons health)
    if (pokemons) {
      setArenaData({
        myPokemon: initiatePokemonForArena(pokemons[0]),
        rivalPokemon: initiatePokemonForArena(pokemons[1]),
        isOver: false,
        turnOrder: getFasterPokemon([arenaData.myPokemon, arenaData.rivalPokemon]),
        isTurnOver: true,
      });
    }
  }, [pokemons]);

  useEffect(() => {
    if (chosenMove) {
      gameLoop();
    }
  }, [chosenMove]);

  return { arenaData, isLoading };
}

const initiatePokemonForArena = (pokemon: Pokemon): ArenaPokemon => ({
  ...pokemon,
  currentHealth: pokemon.hp,
  currentPercentageHealth: '100%',
  isAlive: true,
});
