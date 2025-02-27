import { ArenaData } from './arena.model';
import { ArenaPokemon, MoveDetail, DamageInfo } from './pokemon-model';

export type BattleFlowAction = 'attack' | 'receiveDamage' | 'updateHealthBar';

export interface BattleStep {
  action: BattleFlowAction;
  userId: string;
  targetId?: string;
  waitTime: number; // in milliseconds
  isGameOver?: boolean;
  pokemonName: ArenaPokemon['name'];
  moveName: MoveDetail['name'];
  effectivinessInfo?: DamageInfo;
}

export type BattleFlow = BattleStep[];

const waitTime = 1300;

export const createBattleFlow = (
  userId1: string,
  userId2: string,
  arenaData: ArenaData
): BattleFlow => {
  const user1Pokemon = arenaData.pokemons[userId1];
  const user2Pokemon = arenaData.pokemons[userId2];
  return [
    {
      action: 'attack',
      userId: userId1,
      targetId: userId2,
      waitTime,
      pokemonName: user1Pokemon.name,
      moveName: arenaData.chosenMoves[userId1].name,
      effectivinessInfo: user2Pokemon.receivedAttackData.damageInfo,
    },
    {
      action: 'receiveDamage',
      userId: userId2,
      waitTime,
      pokemonName: user2Pokemon.name,
      moveName: arenaData.chosenMoves[userId1].name,
    },
    {
      action: 'updateHealthBar',
      userId: userId2,
      waitTime,
      isGameOver: !user2Pokemon.isAlive,
      pokemonName: user2Pokemon.name,
      moveName: arenaData.chosenMoves[userId1].name,
    },
    {
      action: 'attack',
      userId: userId2,
      targetId: userId1,
      waitTime,
      pokemonName: user2Pokemon.name,
      moveName: arenaData.chosenMoves[userId2].name,
      effectivinessInfo: user1Pokemon.receivedAttackData.damageInfo,
    },
    {
      action: 'receiveDamage',
      userId: userId1,
      waitTime,
      pokemonName: user1Pokemon.name,
      moveName: arenaData.chosenMoves[userId2].name,
    },
    {
      action: 'updateHealthBar',
      userId: userId1,
      waitTime,
      isGameOver: !user1Pokemon.isAlive,
      pokemonName: user1Pokemon.name,
      moveName: arenaData.chosenMoves[userId2].name,
    },
  ];
};
