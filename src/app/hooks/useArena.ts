import { useEffect, useState } from 'react';
import { Pokemon, ArenaPokemon } from '../models/pokemon-model';
import { usePokemon } from './usePokemon';

interface ArenaData {
  myPokemon: ArenaPokemon;
  rivalPokemon: ArenaPokemon;
  isOver: boolean;
}

export function useArena() {
  const { pokemons, isLoading } = usePokemon();
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

  return { arenaData, isLoading };
}

const initiatePokemonForArena = (pokemon: Pokemon): ArenaPokemon => ({
  ...pokemon,
  currentHealth: pokemon.hp,
  currentPercentageHealth: '100%',
  isAlive: true,
});
