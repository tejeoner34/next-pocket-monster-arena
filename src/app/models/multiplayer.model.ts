import { ChosenMovesType } from './arena.model';
import { ArenaPokemon } from './pokemon-model';

export interface ChallengeResponseType {
  ok: boolean;
  accept: boolean;
  message: string;
  roomId?: string;
  userId?: string;
}

export interface AcceptedChallengeResponseType {
  room: OnlineArenaDataType;
}

export interface OnlineArenaDataType {
  roomId: string;
  users: string[];
  pokemons: Record<string, ArenaPokemon>;
  isOver: boolean;
  turnOrder: [string, string];
  isTurnOver: boolean;
  message: string;
  choseMoves: ChosenMovesType;
  isRoomComplete: boolean;
  battleFlow: BattleFlow;
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
};

export const SOCKET_RESPONSES = {
  connect: 'connect',
  receiveChallenge: 'receive-challenge',
  challengeResponse: 'challenge-response',
  challengeRejected: 'challenge-rejected',
  noUserFound: 'no-user-found',
  challengeAccepted: 'challenge-accepted',
};

export interface BattleStep {
  action: string;
  userId: string;
  targetId?: string;
  waitTime: number;
}

export type BattleFlow = BattleStep[];
