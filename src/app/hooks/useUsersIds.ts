import { useState } from 'react';
import { ChallengerDataType } from '../models';
import { createRandomId } from '../lib';

export function useUsersIds() {
  const [userId, _setUserId] = useState<string>('');
  const [rivalId, _setRivalId] = useState<ChallengerDataType['challengerId']>('');

  const setUserId = (id: string) => _setUserId(id);
  const setRivalId = (id: ChallengerDataType['challengerId']) => _setRivalId(id);

  const createLocalRandomId = () => {
    const newId = createRandomId();
    setUserId(newId);
    return newId;
  };

  const createLocalIds = () => {
    const newUserId = createLocalRandomId();
    const newRivalId = createLocalRandomId();
    return { newUserId, newRivalId };
  };

  return {
    userId,
    rivalId,
    setUserId,
    setRivalId,
    createLocalIds,
  };
}
