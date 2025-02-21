import { useState } from 'react';

export type InfoBoxMessageType =
  | 'default'
  | 'attack'
  | 'superEffective'
  | 'notEffective'
  | 'missed';

const getInfoBoxMessage = (
  messageType: InfoBoxMessageType,
  pokemonName: string = '',
  moveName: string = ''
) => {
  const messages: Record<InfoBoxMessageType, string> = {
    default: `What will ${pokemonName} do`,
    attack: `${pokemonName} used ${moveName}`,
    superEffective: 'its super effective',
    notEffective: 'its not very effective',
    missed: 'it missed',
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
