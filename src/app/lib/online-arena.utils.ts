import { ArenaPokemonStatus, OnlineArenaDataType } from '../models';

export const updatePokemonStatus = (
  status: ArenaPokemonStatus,
  userId: string,
  data: OnlineArenaDataType
): OnlineArenaDataType => ({
  ...data,
  pokemons: {
    ...data.pokemons,
    [userId]: {
      ...data.pokemons[userId],
      status: status,
    },
  },
});

export const updatePokemonHealth = (
  data: OnlineArenaDataType,
  newData: OnlineArenaDataType,
  userId: string
) => ({
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
