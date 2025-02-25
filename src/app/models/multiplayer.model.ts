import { ArenaPokemon, MoveDetail } from './pokemon-model';

export interface ChallengeResponseType {
  ok: boolean;
  accept: boolean;
  message: string;
  roomId?: string;
  userId?: string;
}

export interface OnlineArenaDataType {
  id: string;
  users: string[];
  pokemons: Record<string, ArenaPokemon>;
  isOver: boolean;
  turnOrder: [string, string];
  isTurnOver: boolean;
  message: string;
  choseMoves: Record<string, MoveDetail>;
  isRoomComplete: boolean;
  battleFlow: BattleFlow;
  isArenaReady: boolean;
}

export interface ReceiveChallengeType {
  challengerId: string;
  message: string;
}

export type ChallengerDataType = {
  challengerId: string;
};

export const REQUEST_STATUSES = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  NO_USER: 'no-user',
  NOT_SENT: 'not-sent',
} as const;

export interface ChallengeRequestStatus {
  status: RequestStatusType;
  isSent: boolean;
}

export type RequestStatusType = (typeof REQUEST_STATUSES)[keyof typeof REQUEST_STATUSES];

export const SOCKET_ACTIONS = {
  getUserId: 'get-user-id',
  joinRoom: 'join-room',
  leaveRoom: 'leave-room',
  challengeUser: 'challenge-user',
  disconnect: 'disconnect',
  challengeResponse: 'challenge-response',
  chooseMove: 'choose-move',
  gameOver: 'game-over',
};

export const SOCKET_RESPONSES = {
  connect: 'connect',
  receiveChallenge: 'received-challenge',
  challengeResponse: 'challenge-response',
  challengeRejected: 'challenge-rejected',
  noUserFound: 'no-user-found',
  challengeAccepted: 'challenge-accepted',
  newTurn: 'new-turn',
  gameOver: 'game-over',
};

export interface BattleStep {
  action: BattleFlowAction;
  userId: string;
  targetId?: string;
  waitTime: number;
  isGameOver?: boolean;
}

export type BattleFlow = BattleStep[];

export type BattleFlowAction = 'attack' | 'receiveDamage' | 'updateHealthBar';
