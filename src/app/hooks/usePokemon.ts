import { getXamountOfPokemon } from '../api/pokemon.api';
import { useQuery } from '@tanstack/react-query';

export const usePokemon = () => {
  const {
    data: pokemons,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => await getXamountOfPokemon(2),
    queryKey: ['pokemons'],
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  return { pokemons };
};
