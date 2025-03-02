import {
  ArenaData,
  ArenaPokemon,
  ArenaPokemonStatus,
  DamageInfo,
  MoveDetail,
  Pokemon,
  ReceivedMoveDetail,
} from '../models';
import { getMoveEffectivinesInfo, getRemainingHP } from './pokemon-moves-types-relationship';
import { getPercentageString } from './utils';

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

export const updatePokemonHealth = (
  pokemon: ArenaPokemon,
  attackerPokemon: ArenaPokemon,
  move: MoveDetail,
  arenaData: ArenaData,
  rivalId: string
): ArenaPokemon => {
  const updatedPokemon = { ...pokemon };
  const moveEffectiviness = getMoveEffectivinesInfo(
    move.type.name,
    arenaData.pokemons[rivalId].processedTypes[0]
  ).value;

  const remainingHP = getRemainingHP({
    pokemonHP: updatedPokemon.currentHealth,
    receivedAttackEffectivinessIndex: moveEffectiviness,
    attackerBasePower: attackerPokemon.power,
    attacksPower: move.power,
  });

  updatedPokemon.currentHealth = remainingHP;
  updatedPokemon.currentPercentageHealth = getPercentageString(remainingHP, pokemon.hp);
  updatedPokemon.isAlive = updatedPokemon.currentHealth > 0;
  updatedPokemon.status = updatedPokemon.isAlive ? 'idle' : 'defeated';
  return updatedPokemon;
};

export const initiatePokemonForArena = (pokemon: Pokemon): ArenaPokemon => ({
  ...pokemon,
  currentHealth: pokemon.hp,
  currentPercentageHealth: '100%',
  isAlive: true,
  status: 'idle',
  receivedAttackData: {} as ReceivedMoveDetail,
});
