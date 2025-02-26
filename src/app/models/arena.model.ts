import { ArenaPokemon, MoveDetail } from './pokemon-model';

export interface ArenaData {
  myPokemon: ArenaPokemon;
  rivalPokemon: ArenaPokemon;
  isOver: boolean;
  turnOrder: [ArenaPokemonKeys, ArenaPokemonKeys];
  isTurnOver: boolean;
  message: MessageIntl;
}

export type MessageIntl = {
  key: string;
  params: Record<string, string>;
};

export type ArenaPokemonKeys = 'myPokemon' | 'rivalPokemon';

export type ChosenMovesType = {
  [key in ArenaPokemonKeys]: MoveDetail;
};
