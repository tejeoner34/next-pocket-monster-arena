import { ArenaData, ArenaPokemon, ArenaPokemonStatus, DamageInfo, Pokemon } from '../models';

export const getFasterPokemon = (pokemons: ArenaPokemon[]): ArenaPokemon[] =>
  pokemons.sort((a, b) => b.speed - a.speed);

export const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

export const getTurnOrder = (pokemons: Record<string, Pokemon>): string[] => {
  return Object.entries(pokemons)
    .sort(([, pokemonA], [, pokemonB]) => pokemonB.speed - pokemonA.speed)
    .map(([userId]) => userId);
};

export const updatePokemonStatus = (
  status: ArenaPokemonStatus,
  userId: string,
  data: ArenaData
): ArenaData => ({
  ...data,
  pokemons: {
    ...data.pokemons,
    [userId]: {
      ...data.pokemons[userId],
      status: status,
    },
  },
});

export const modifyPokemonHealth = (data: ArenaData, newData: ArenaData, userId: string) => ({
  ...data,
  pokemons: {
    ...data.pokemons,
    [userId]: {
      ...data.pokemons[userId],
      currentHealth: newData.pokemons[userId].currentHealth,
      currentPercentageHealth: newData.pokemons[userId].currentPercentageHealth,
    },
  },
});

export const isSpecialEffect = (effectivinessInfo: DamageInfo): boolean => {
  return effectivinessInfo.value !== 1;
};
