import axios from 'axios';
import { generateRandomNumber } from '../lib/utils';
import { Pokemon } from '../models/pokemon-model';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const getRandomPokemon = async () => {
  const randomPokemonId = generateRandomNumber(1, 150);
  try {
    const response = await axios.get<Pokemon>(`${BASE_URL}/${randomPokemonId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return {} as Pokemon;
  }
};

export const getXamountOfPokemon = async (amount: number): Promise<Pokemon[]> => {
  console.log('calling');
  const randomPokemonIds = Array.from({ length: amount });
  try {
    return await Promise.all(
      randomPokemonIds.map(async () => {
        const pokemon = await getRandomPokemon();
        return pokemonAdapter(pokemon);
      })
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};

const pokemonAdapter = (pokemon: Pokemon) => {
  return {
    ...pokemon,
    hp: pokemon.stats.find((stat) => stat.stat.name === 'hp')?.base_stat ?? 0,
  };
};
