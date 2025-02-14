import { getXamountOfPokemon } from '../api/pokemon.api';
import { useQuery } from '@tanstack/react-query';

export const usePokemon = (numberOfPokemons = 2) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getXamountOfPokemon(numberOfPokemons),
    queryKey: ['pokemons'],
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError };
};
