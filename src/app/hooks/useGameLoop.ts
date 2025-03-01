import { isSpecialEffect, wait } from '../lib';
import { ArenaData } from '../models';
import { SetInfoBoxMessageType } from './useInfoBoxMessage';

type UseGameLoopProps = {
  attack: (pokemonName: string, moveName: string, userId: string) => void;
  receiveDamage: (userId: string) => void;
  updateHealthBar: (userId: string, data: ArenaData) => void;
  setInfoBoxMessage: (value: SetInfoBoxMessageType) => void;
  updateArenaData: React.Dispatch<React.SetStateAction<ArenaData>>;
  gameOver: () => void;
};

export function useGameLoop<T extends ArenaData>({
  attack,
  receiveDamage,
  updateHealthBar,
  setInfoBoxMessage,
  updateArenaData,
  gameOver,
}: UseGameLoopProps) {
  const gameLoop = async (data: T) => {
    const { battleFlow } = data;
    for (const {
      action,
      userId,
      waitTime,
      isGameOver,
      moveName,
      pokemonName,
      effectivinessInfo,
    } of battleFlow) {
      switch (action) {
        case 'attack':
          attack(pokemonName, moveName, userId);
          break;
        case 'receiveDamage':
          receiveDamage(userId);
          break;
        case 'updateHealthBar':
          updateHealthBar(userId, data);
          break;
        default:
          break;
      }
      if (isGameOver) {
        gameOver();
        break;
      }
      if (effectivinessInfo && isSpecialEffect(effectivinessInfo)) {
        await wait(waitTime);
        setInfoBoxMessage({
          type: effectivinessInfo.label,
        });
      }
      await wait(waitTime);
    }
    updateArenaData((prev) => ({
      ...prev,
      isTurnOver: true,
    }));
    setInfoBoxMessage({
      type: 'default',
    });
  };

  return { gameLoop };
}
