import { useState } from 'react';
import { ReceiveChallengeType, ChallengeRequestStatus, REQUEST_STATUSES } from '../models';

const defaultRequestStatus: ChallengeRequestStatus = {
  status: REQUEST_STATUSES.NOT_SENT,
  isSent: false,
};

export function useChallenge() {
  const [receivedChallenge, setReceivedChallenge] = useState<ReceiveChallengeType>(
    {} as ReceiveChallengeType
  );
  const [challengeRequestStatus, setChallengeRequestStatus] =
    useState<ChallengeRequestStatus>(defaultRequestStatus);
  const [rivalLeftArena, setRivalLeftArena] = useState(false);

  const resetChallengeStatus = () => {
    setChallengeRequestStatus(defaultRequestStatus);
  };

  return {
    rivalLeftArena,
    setRivalLeftArena,
    receivedChallenge,
    setReceivedChallenge,
    challengeRequestStatus,
    setChallengeRequestStatus,
    resetChallengeStatus,
  };
}
