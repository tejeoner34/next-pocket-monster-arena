import { isSpecialEffect, modifyPokemonHealth, updatePokemonStatus, wait } from '../lib';
import { ArenaData, ArenaPokemon, MoveDetail } from '../models';
import { SetInfoBoxMessageType } from './useInfoBoxMessage';

type UseGameLoopProps = {
  setInfoBoxMessage: (value: SetInfoBoxMessageType) => void;
  updateArenaData: React.Dispatch<React.SetStateAction<ArenaData>>;
  gameOver: () => void;
};

export function useGameLoop<T extends ArenaData>({
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
        await defeatPokemon(userId);
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

  const attack = (
    pokemonName: ArenaPokemon['name'],
    moveName: MoveDetail['name'],
    attacker: string
  ) => {
    setInfoBoxMessage({
      type: 'attack',
      pokemonName,
      moveName,
    });
    updateArenaData((prev) => updatePokemonStatus('attacking', attacker, prev));
  };

  const receiveDamage = (receiver: string) => {
    updateArenaData((prev) => updatePokemonStatus('stunned', receiver, prev));
  };

  const updateHealthBar = async (userId: string, newData: ArenaData) => {
    updateArenaData((prev) => modifyPokemonHealth(prev, newData, userId));
  };

  const defeatPokemon = async (userId: string) => {
    updateArenaData((prev) => updatePokemonStatus('defeated', userId, prev));
    await wait(1000);
  };

  return { gameLoop };
}
