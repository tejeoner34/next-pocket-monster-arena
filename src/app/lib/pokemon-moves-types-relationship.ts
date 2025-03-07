import { ArenaMoves, DamageLabel, PokemonType } from '../models';

const neutralDamage: TypeEffectivenessEntry = {
  value: 1,
  label: 'neutral',
};

const typeEffectiveness: TypeEffectivenessMap = {
  normal: {
    rock: { value: 0.5, label: 'not-effective' },
    ghost: { value: 0, label: 'no-effect' },
    steel: { value: 0.5, label: 'not-effective' },
  },
  fire: {
    rock: { value: 0.5, label: 'not-effective' },
    bug: { value: 2, label: 'super-effective' },
    steel: { value: 2, label: 'super-effective' },
    grass: { value: 2, label: 'super-effective' },
    ice: { value: 2, label: 'super-effective' },
    dragon: { value: 0.5, label: 'not-effective' },
    water: { value: 0.5, label: 'not-effective' },
    fire: { value: 0.5, label: 'not-effective' },
  },
  water: {
    fire: { value: 2, label: 'super-effective' },
    water: { value: 0.5, label: 'not-effective' },
    grass: { value: 0.5, label: 'not-effective' },
    ground: { value: 2, label: 'super-effective' },
    rock: { value: 2, label: 'super-effective' },
    dragon: { value: 0.5, label: 'not-effective' },
  },
  electric: {
    water: { value: 2, label: 'super-effective' },
    electric: { value: 0.5, label: 'not-effective' },
    grass: { value: 0.5, label: 'not-effective' },
    ground: { value: 0, label: 'no-effect' },
    flying: { value: 2, label: 'super-effective' },
    dragon: { value: 0.5, label: 'not-effective' },
  },
  grass: {
    fire: { value: 0.5, label: 'not-effective' },
    water: { value: 2, label: 'super-effective' },
    grass: { value: 0.5, label: 'not-effective' },
    poison: { value: 0.5, label: 'not-effective' },
    ground: { value: 2, label: 'super-effective' },
    flying: { value: 0.5, label: 'not-effective' },
    bug: { value: 0.5, label: 'not-effective' },
    rock: { value: 2, label: 'super-effective' },
    dragon: { value: 0.5, label: 'not-effective' },
    steel: { value: 0.5, label: 'not-effective' },
  },
  ice: {
    fire: { value: 0.5, label: 'not-effective' },
    water: { value: 0.5, label: 'not-effective' },
    ice: { value: 0.5, label: 'not-effective' },
    ground: { value: 2, label: 'super-effective' },
    flying: { value: 2, label: 'super-effective' },
    dragon: { value: 2, label: 'super-effective' },
    steel: { value: 0.5, label: 'not-effective' },
    grass: { value: 2, label: 'super-effective' },
  },
  fighting: {
    normal: { value: 2, label: 'super-effective' },
    ice: { value: 2, label: 'super-effective' },
    rock: { value: 2, label: 'super-effective' },
    dark: { value: 2, label: 'super-effective' },
    steel: { value: 2, label: 'super-effective' },
    poison: { value: 0.5, label: 'not-effective' },
    flying: { value: 0.5, label: 'not-effective' },
    psychic: { value: 0.5, label: 'not-effective' },
    bug: { value: 0.5, label: 'not-effective' },
    fairy: { value: 0.5, label: 'not-effective' },
    ghost: { value: 0, label: 'no-effect' },
  },
  psychic: {
    fighting: { value: 2, label: 'super-effective' },
    poison: { value: 2, label: 'super-effective' },
    steel: { value: 0.5, label: 'not-effective' },
    psychic: { value: 0.5, label: 'not-effective' },
    dark: { value: 0, label: 'no-effect' },
  },
  bug: {
    grass: { value: 2, label: 'super-effective' },
    psychic: { value: 2, label: 'super-effective' },
    dark: { value: 2, label: 'super-effective' },
    fire: { value: 0.5, label: 'not-effective' },
    fighting: { value: 0.5, label: 'not-effective' },
    poison: { value: 0.5, label: 'not-effective' },
    flying: { value: 0.5, label: 'not-effective' },
    ghost: { value: 0.5, label: 'not-effective' },
    steel: { value: 0.5, label: 'not-effective' },
    fairy: { value: 0.5, label: 'not-effective' },
  },
  rock: {
    fire: { value: 2, label: 'super-effective' },
    ice: { value: 2, label: 'super-effective' },
    flying: { value: 2, label: 'super-effective' },
    bug: { value: 2, label: 'super-effective' },
    fighting: { value: 0.5, label: 'not-effective' },
    ground: { value: 0.5, label: 'not-effective' },
    steel: { value: 0.5, label: 'not-effective' },
  },
  ghost: {
    psychic: { value: 2, label: 'super-effective' },
    ghost: { value: 2, label: 'super-effective' },
    normal: { value: 0, label: 'no-effect' },
    dark: { value: 0.5, label: 'not-effective' },
  },
  dragon: {
    dragon: { value: 2, label: 'super-effective' },
    steel: { value: 0.5, label: 'not-effective' },
    fairy: { value: 0, label: 'no-effect' },
  },
  dark: {
    psychic: { value: 2, label: 'super-effective' },
    ghost: { value: 2, label: 'super-effective' },
    fighting: { value: 0.5, label: 'not-effective' },
    dark: { value: 0.5, label: 'not-effective' },
    fairy: { value: 0.5, label: 'not-effective' },
  },
  steel: {
    rock: { value: 2, label: 'super-effective' },
    ice: { value: 2, label: 'super-effective' },
    fairy: { value: 2, label: 'super-effective' },
    fire: { value: 0.5, label: 'not-effective' },
    water: { value: 0.5, label: 'not-effective' },
    electric: { value: 0.5, label: 'not-effective' },
    steel: { value: 0.5, label: 'not-effective' },
  },
  fairy: {
    fighting: { value: 2, label: 'super-effective' },
    dragon: { value: 2, label: 'super-effective' },
    dark: { value: 2, label: 'super-effective' },
    fire: { value: 0.5, label: 'not-effective' },
    poison: { value: 0.5, label: 'not-effective' },
    steel: { value: 0.5, label: 'not-effective' },
  },
  poison: {
    grass: { value: 2, label: 'super-effective' },
    fairy: { value: 2, label: 'super-effective' },
    poison: { value: 0.5, label: 'not-effective' },
    ground: { value: 0.5, label: 'not-effective' },
    rock: { value: 0.5, label: 'not-effective' },
    ghost: { value: 0.5, label: 'not-effective' },
    steel: { value: 0, label: 'no-effect' },
  },
  ground: {
    fire: { value: 2, label: 'super-effective' },
    electric: { value: 2, label: 'super-effective' },
    poison: { value: 2, label: 'super-effective' },
    rock: { value: 2, label: 'super-effective' },
    steel: { value: 2, label: 'super-effective' },
    grass: { value: 0.5, label: 'not-effective' },
    bug: { value: 0.5, label: 'not-effective' },
    flying: { value: 0, label: 'no-effect' },
  },
  flying: {
    grass: { value: 2, label: 'super-effective' },
    fighting: { value: 2, label: 'super-effective' },
    bug: { value: 2, label: 'super-effective' },
    electric: { value: 0.5, label: 'not-effective' },
    rock: { value: 0.5, label: 'not-effective' },
    steel: { value: 0.5, label: 'not-effective' },
  },
};

interface TypeEffectivenessEntry {
  value: number;
  label: DamageLabel;
}

type TypeEffectivenessMap = {
  [attackingType in PokemonType]: {
    [defendingType in PokemonType]?: TypeEffectivenessEntry;
  };
};

export const getMoveEffectivinesInfo = (
  moveType: PokemonType,
  targetPokemonType: PokemonType
): TypeEffectivenessEntry => {
  const effectiveness = typeEffectiveness[moveType][targetPokemonType];
  return effectiveness ?? neutralDamage;
};

export const getMostEffectiveMove = (moves: ArenaMoves, rivalPokemonTypes: PokemonType[]) => {
  const effectivenesArray = moves.map((move) => {
    const effectiveness = getMoveEffectivinesInfo(
      move.type.name as PokemonType,
      rivalPokemonTypes[0]
    );
    return {
      move,
      effectiveness,
    };
  });
  const mostEffective = effectivenesArray.sort(
    (a, b) => b.effectiveness.value - a.effectiveness.value
  )[0];
  return mostEffective.move;
};

export const getRemainingHP = ({
  pokemonHP,
  receivedAttackEffectivinessIndex,
  attackerBasePower,
  attacksPower,
}: {
  pokemonHP: number;
  receivedAttackEffectivinessIndex: number;
  attackerBasePower: number;
  attacksPower: number;
}) => {
  if (!attacksPower) return pokemonHP;
  const remainingHP = Math.floor(
    pokemonHP - attackerBasePower * 0.2 - (attacksPower / 5) * receivedAttackEffectivinessIndex
  );
  return remainingHP > 0 ? remainingHP : 0;
};
