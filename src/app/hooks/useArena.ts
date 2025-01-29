import { useEffect, useState } from 'react';
import { Pokemon } from '../models/pokemon-model';
import { usePokemon } from './usePokemon';

interface ArenaData {
  myPokemon: Pokemon;
  rivalPokemon: Pokemon;
  isOver: boolean;
}

interface PokemonArena extends Pokemon {
  currentHealth: number;
  currentPercentageHealth: string;
  isAlive: boolean;
}

export function useArena() {
  const { pokemons } = usePokemon();
  const [arenaData, setArenaData] = useState<ArenaData>({} as ArenaData);

  useEffect(() => {
    if (pokemons) {
      setArenaData({
        myPokemon: initiatePokemonForArena(pokemons[0]),
        rivalPokemon: initiatePokemonForArena(pokemons[1]),
        isOver: false,
      });
    }
  }, [pokemons]);

  return { arenaData };
}

const initiatePokemonForArena = (pokemon: Pokemon): PokemonArena => ({
  ...pokemon,
  currentHealth: pokemon.hp,
  currentPercentageHealth: '100%',
  isAlive: true,
});
