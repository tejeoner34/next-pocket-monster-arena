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
} as const;

export interface ChallengeRequestStatus {
  status: RequestStatusType;
  isSent: boolean;
}

export type RequestStatusType = (typeof REQUEST_STATUSES)[keyof typeof REQUEST_STATUSES];
