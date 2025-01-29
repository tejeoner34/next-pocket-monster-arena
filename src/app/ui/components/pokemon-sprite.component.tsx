import Image from 'next/image';

export default function PokemonSprite({ sprite }: { sprite: string }) {
  return (
    <div className="relative w-1/2 max-w-[200px]">
      <Image
        src={sprite}
        alt="pokemon image"
        className="w-full h-full relative z-10"
        width={300}
        height={300}
      />
      <div className="w-[240px] h-[60px] rounded-[124px/30px] bg-gray-400 absolute bottom-[13px] left-[-22px] border-[5px] border-white opacity-60 "></div>
    </div>
  );
}
