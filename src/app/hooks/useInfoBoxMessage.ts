import { useState } from 'react';
import { DamageLabel } from '../models/pokemon-model';

export type InfoBoxMessageType =
  | 'default'
  | 'attack'
  | 'missed'
  | 'waitingForRival'
  | 'gameOver'
  | DamageLabel;

const getInfoBoxMessage = (
  messageType: InfoBoxMessageType,
  pokemonName: string = '',
  moveName: string = ''
) => {
  const messages: Record<InfoBoxMessageType, string> = {
    default: `What will ${pokemonName} do`,
    attack: `${pokemonName} used ${moveName}`,
    'super-effective': 'Its super effective',
    'not-effective': 'Its not very effective',
    missed: 'It missed',
    waitingForRival: 'Waiting for rival',
    gameOver: `${pokemonName} has been defeated`,
  };
  return messages[messageType];
};

export function useInfoBoxMessage() {
  const [infoBoxMessage, _setInfoBoxMessage] = useState<string>('');

  const setInfoBoxMessage = ({
    type,
    pokemonName = '',
    moveName = '',
  }: {
    type: InfoBoxMessageType;
    pokemonName?: string;
    moveName?: string;
  }) => {
    const message = getInfoBoxMessage(type, pokemonName, moveName);
    _setInfoBoxMessage(message);
  };
  return {
    infoBoxMessage,
    setInfoBoxMessage,
  };
}
