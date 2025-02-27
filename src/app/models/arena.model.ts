import { BattleFlow } from './battleFlow';
import { ArenaPokemon, MoveDetail } from './pokemon-model';

export interface ArenaData {
  users: UserId[];
  pokemons: Record<string, ArenaPokemon>;
  isOver: boolean;
  turnOrder: string[];
  isTurnOver: boolean;
  chosenMoves: Record<UserId, MoveDetail>;
  battleFlow: BattleFlow;
  isArenaReady: boolean;
}

type UserId = string;

export type MessageIntl = {
  key: string;
  params: Record<string, string>;
};

export type ArenaPokemonKeys = 'myPokemon' | 'rivalPokemon';

export type ChosenMovesType = {
  [key in ArenaPokemonKeys]: MoveDetail;
};
