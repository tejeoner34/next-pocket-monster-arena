'use client';
import { useArenaContext } from '@/app/context/arena.context';
import GameOverModal from '@/app/ui/components/game-over-modal.component';
import InfoBox from '@/app/ui/components/info-box.component';
import PokemonInfo from '@/app/ui/components/pokemon-info.component';
import RivalPokemonInfo from '@/app/ui/components/rival-pokemon-info.component';
import ScreenPokeballPlaceholder from '@/app/ui/components/screen-pokeball-placeholder';

export default function Page() {
  const { arenaData, rivalId, userId, isLoading, chooseMove, infoBoxMessage } = useArenaContext();
  return (
    <>
      <ScreenPokeballPlaceholder isOpen={!isLoading} />

      <div className="relative w-full overflow-hidden h-[540px] rounded bg-gradient-to-b from-[#242400] to-[#DDECE0]">
        {arenaData.isArenaReady && (
          <div>
            <div className="flex flex-row-reverse justify-around">
              <RivalPokemonInfo pokemon={arenaData.pokemons[rivalId]} />
            </div>
            <div className="flex justify-around items-center w-full">
              <PokemonInfo pokemon={arenaData.pokemons[userId]} />
            </div>
            <InfoBox
              boxMessage={infoBoxMessage}
              moves={arenaData.pokemons[userId].arenaMoves}
              isTurnOver={arenaData.isTurnOver}
              onChoseMove={chooseMove}
            />
          </div>
        )}
      </div>
      <GameOverModal isOpen={arenaData.isOver} onClose={() => {}} />
    </>
  );
}
