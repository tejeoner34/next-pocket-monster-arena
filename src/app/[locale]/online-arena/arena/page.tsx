'use client';
import { useCallback } from 'react';
import { useMultiplayerContext } from '@/app/hooks';
import GameOverModal from '@/app/ui/components/game-over-modal.component';
import InfoBox from '@/app/ui/components/info-box.component';
import PokemonInfo from '@/app/ui/components/pokemon-info.component';
import RivalPokemonInfo from '@/app/ui/components/rival-pokemon-info.component';
import ScreenPokeballPlaceholder from '@/app/ui/components/screen-pokeball-placeholder';
import useOnLeavePage from '@/app/hooks/useOnLeavePage';
import UserLeftArenaModal from '@/app/ui/components/user-left-arena-modal.component';
import { redirect } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { routes } from '@/app/routes';

export default function Page() {
  const {
    chooseMove,
    infoBoxMessage,
    leaveArena,
    onlineArenaData,
    onlineId,
    rivalId,
    rivalLeftArena,
  } = useMultiplayerContext();
  const locale = useLocale();

  const handleLeave = useCallback(() => {
    leaveArena();
  }, [leaveArena]);

  useOnLeavePage(handleLeave);

  if (!rivalId) {
    redirect({ href: routes.findPlayer, locale });
  }

  return (
    <>
      <ScreenPokeballPlaceholder isOpen={onlineArenaData.isArenaReady} />

      <div className="relative w-full overflow-hidden h-[540px] rounded bg-gradient-to-b from-[#242400] to-[#DDECE0]">
        <div>
          <div className="flex flex-row-reverse justify-around">
            <RivalPokemonInfo pokemon={onlineArenaData.pokemons[rivalId]} />
          </div>
          <div className="flex justify-around items-center w-full">
            <PokemonInfo pokemon={onlineArenaData.pokemons[onlineId]} />
          </div>
          <InfoBox
            boxMessage={infoBoxMessage}
            moves={onlineArenaData.pokemons[onlineId].arenaMoves}
            isTurnOver={onlineArenaData.isTurnOver}
            onChoseMove={chooseMove}
          />
        </div>
      </div>
      <GameOverModal isOpen={onlineArenaData.isOver} onClose={() => {}} />
      <UserLeftArenaModal isOpen={rivalLeftArena} />
    </>
  );
}
