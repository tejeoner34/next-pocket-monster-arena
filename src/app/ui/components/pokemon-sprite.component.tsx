import Image from 'next/image';
import { ArenaPokemonStatus } from '@/app/models/pokemon-model';

export default function PokemonSprite({
  sprite,
  statusAnimation,
}: {
  sprite: string;
  statusAnimation?: ArenaPokemonStatus;
}) {
  return (
    <div className={`relative w-1/2 max-w-[200px]`}>
      <div className={`relative w-full h-full ${statusAnimation}`}>
        <Image
          src={sprite}
          alt="pokemon image"
          className="w-full h-full relative z-10"
          width={300}
          height={300}
        />
      </div>
      <div className="w-[240px] h-[60px] rounded-[124px/30px] bg-gray-400 absolute bottom-[13px] left-[-22px] border-[5px] border-white opacity-60 "></div>
      <style jsx>{`
        @keyframes myPokemonAttack {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(100px);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes rivalPokemonAttack {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-100px);
          }
          100% {
            transform: translateX(0);
          }
        }

        .attacking {
          animation: myPokemonAttack 0.2s ease-in-out;
        }

        .rival-attacking {
          animation: rivalPokemonAttack 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
}
