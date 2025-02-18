'use client';
import { useMultiplayerContext } from '@/app/hooks';
import GameOverModal from '@/app/ui/components/game-over-modal.component';
import InfoBox from '@/app/ui/components/info-box.component';
import PokemonInfo from '@/app/ui/components/pokemon-info.component';
import RivalPokemonInfo from '@/app/ui/components/rival-pokemon-info.component';
import ScreenPokeballPlaceholder from '@/app/ui/components/screen-pokeball-placeholder';
import { redirect } from 'next/navigation';

export default function Page() {
  const { onlineArenaData, rivalId, onlineId, chooseMove } = useMultiplayerContext();

  if (!rivalId) {
    redirect('/online-arena/find-player');
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
            boxMessage={onlineArenaData.message}
            moves={onlineArenaData.pokemons[onlineId].arenaMoves}
            isTurnOver={onlineArenaData.isTurnOver}
            onChoseMove={chooseMove}
          />
          <div>
            <button
              // onClick={() => setMovesContainerOpen(!movesContainerOpen)}
              className="hidden text-black w-full p-2 rounded mt-2"
              // disabled={hasSelectedMove}
            >
              Choose Move
            </button>
            <div
            // className={`bg-gray-700 w-full flex flex-col items-center gap-4 p-4 absolute left-0 bottom-0 z-[1000] transition-all duration-150 ease-in-out ${
            //   movesContainerOpen
            //     ? 'opacity-100 pointer-events-auto translate-y-0'
            //     : 'opacity-0 pointer-events-none translate-y-[50px]'
            // }`}
            >
              {/* {onlineArenaData.myPokemon.arenaMoves.map((move, i) => (
                <div
                  key={i}
                  className="w-[90%] text-center bg-aquamarine p-4 cursor-pointer"
                  // onClick={() => {
                  //   chooseMove(move, i);
                  //   setMovesContainerOpen(false);
                  // }}
                >
                  <p>{move.name}</p>
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </div>
      <GameOverModal isOpen={onlineArenaData.isOver} onClose={() => {}} />
    </>
  );
}
