import { useState } from 'react';
import { ChallengerDataType } from '../models';

export function useUsersIds() {
  const [userId, _setUserId] = useState<string>('');
  const [rivalId, _setRivalId] = useState<ChallengerDataType['challengerId']>('');

  const setUserId = (id: string) => _setUserId(id);
  const setRivalId = (id: ChallengerDataType['challengerId']) => _setRivalId(id);
  return {
    userId,
    rivalId,
    setUserId,
    setRivalId,
  };
}
