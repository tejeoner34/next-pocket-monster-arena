export interface ChallengeResponseType {
  ok: boolean;
  accept: boolean;
  message: string;
  roomId?: string;
  userId?: string;
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
  challengeUser: 'challenge-user',
  disconnect: 'disconnect',
  challengeResponse: 'challenge-response',
  chooseMove: 'choose-move',
  gameOver: 'game-over',
  leavesRoom: 'leaves-room',
  rematch: 'rematch',
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
  userDisconnected: 'user-disconnected',
  leavesRoom: 'leaves-room',
  rematch: 'rematch',
};
