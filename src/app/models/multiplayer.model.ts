export interface ChallengeResponseType {
  ok: boolean;
  accept: boolean;
  message: string;
}

export interface ReceiveChallengeType {
  challengerId: string;
  message: string;
}

export type ChallengerDataType = {
  challengerId: string;
};
