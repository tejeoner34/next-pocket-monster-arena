import { useState } from 'react';
import { DamageLabel } from '../models/pokemon-model';
import { useTranslations } from 'next-intl';

export type InfoBoxMessageType = 'default' | 'attack' | 'missed' | 'waitingForRival' | DamageLabel;

export function useInfoBoxMessage() {
  const t = useTranslations('arena.infoBox');
  const [infoBoxMessage, _setInfoBoxMessage] = useState<string>(t('default'));

  const setInfoBoxMessage = ({
    type,
    pokemonName = '',
    moveName = '',
  }: {
    type: InfoBoxMessageType;
    pokemonName?: string;
    moveName?: string;
  }) => {
    const message = t(type, { pokemonName, moveName });
    _setInfoBoxMessage(message);
  };
  return {
    infoBoxMessage,
    setInfoBoxMessage,
  };
}
