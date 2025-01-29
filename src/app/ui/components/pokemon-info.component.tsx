import { Pokemon } from '@/app/models/pokemon-model';
import Image from 'next/image';

type PokemonInfoProps = {
  pokemon: Pokemon;
};

export default function PokemonInfo({ pokemon }: PokemonInfoProps) {
  return (
    <div className={`flex w-1/2 max-w-[350px] items-start relative h-full`}>
      <div className={`relative w-1/2 max-w-[200px]`}>
        <Image
          src={pokemon.sprites.back_default}
          alt="pokemon"
          className="w-full h-[200px] relative z-10"
          width={200}
          height={200}
        />
        <div className="w-[240px] h-[85px] rounded-[124px/50px] bg-gray-600 absolute bottom-[13px] left-[-22px] border-[7px] border-white opacity-70 rotate-[51deg]"></div>
      </div>
      <div className="w-full min-h-[100px] bg-[#f5f6da] flex flex-col justify-evenly items-center border-[7px] border-gray-600 rounded-tl-[20px] rounded-tr-[5px] rounded-br-[20px] rounded-bl-[2px] z-10">
        <div className="text-center">
          <h3 className="uppercase font-bold">{pokemon.name}</h3>
        </div>
        <div className="w-3/4 h-[22px] relative rounded-lg border-2 border-white">
          <div className="bg-black h-full rounded-lg px-2 font-bold text-orange-500 flex items-center">
            HP
          </div>
          <div className="absolute w-4/5 h-3/4 top-0 bottom-0 right-1 border-2 border-white rounded-lg">
            <div
              className="h-full rounded-lg"
              // style={{ width: pokemon.pokemonHealth, background: calculateLifeBarColor(pokemon.hp) }}
            ></div>
          </div>
        </div>

        <div className="text-black">
          <p>
            {pokemon.hp}/{pokemon.hp}
          </p>
        </div>
      </div>
    </div>
  );
}
