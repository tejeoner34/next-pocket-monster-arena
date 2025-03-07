import axios from 'axios';
import { generateRandomNumber, getRandomElements } from '../lib/utils';
import { ArenaMoves, Move, MoveDetail, Pokemon } from '../models/pokemon-model';

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
  const randomPokemonIds = Array.from({ length: amount });
  try {
    return await Promise.all(
      randomPokemonIds.map(async () => {
        const pokemon = await getRandomPokemon();
        const moves = await get4MovesInfo(pokemon);
        return pokemonAdapter(pokemon, moves);
      })
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};

const pokemonAdapter = (pokemon: Pokemon, arenaMoves: ArenaMoves): Pokemon => {
  return {
    ...pokemon,
    hp: pokemon.stats.find((stat) => stat.stat.name === 'hp')?.base_stat ?? 0,
    power: pokemon.stats[1].base_stat,
    speed: pokemon.stats[5].base_stat,
    processedTypes: pokemon.types.map((type) => type.type.name),
    arenaMoves,
  };
};

const get4MovesInfo = async (pokemon: Pokemon): Promise<MoveDetail[]> => {
  const chosenMoves = getRandomMovesFromMoveSet(pokemon.moves);
  try {
    const response = await Promise.all(
      chosenMoves.map(async (move) => await axios.get(move.move.url))
    );
    return response.map((move) => move.data);
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getRandomMovesFromMoveSet = (moves: Move[]): Move[] => {
  const movesAmount = moves.length;
  if (movesAmount <= 4) {
    return moves;
  }
  return getRandomElements(moves, 4);
};
