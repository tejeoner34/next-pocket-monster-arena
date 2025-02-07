import { ArenaPokemon } from '../models/pokemon-model';

export const getFasterPokemon = (pokemons: ArenaPokemon[]): ArenaPokemon[] =>
  pokemons.sort((a, b) => b.speed - a.speed);

export const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
