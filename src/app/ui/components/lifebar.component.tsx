import { PokemonArena } from '@/app/hooks/useArena';

const calculateLifeBarColor = (life: number) => {
  const percentageLife = life / 100;
  if (percentageLife >= 0.4) {
    return 'green';
  } else if (percentageLife < 0.4 && percentageLife > 0.2) {
    return 'orange';
  } else if (percentageLife <= 0.2) {
    return 'red';
  } else {
    return '';
  }
};

export default function Lifebar({
  pokemon,
  showLifePoints = true,
}: {
  pokemon: PokemonArena;
  showLifePoints?: boolean;
}) {
  return (
    <div className="w-full min-h-[100px] max-w-[350px] bg-[#f5f6da] flex flex-col justify-evenly items-center border-[7px] border-gray-600 rounded-tl-[20px] rounded-tr-[5px] rounded-br-[20px] rounded-bl-[2px] z-10">
      <div className="text-center">
        <h3 className="uppercase font-bold text-primary">{pokemon.name}</h3>
      </div>
      <div className="w-3/4 h-[22px] relative rounded-lg border-2 border-white">
        <div className="bg-black h-full rounded-lg px-2 font-bold text-orange-500 flex items-center">
          HP
        </div>
        <div className="absolute w-4/5 h-3/4 top-0 bottom-0 right-1 border-2 border-white rounded-lg">
          <div
            className="h-full rounded-lg"
            style={{
              width: pokemon.currentPercentageHealth,
              background: calculateLifeBarColor(pokemon.currentHealth),
            }}
          ></div>
        </div>
      </div>

      {showLifePoints && (
        <div className="text-black">
          <p>
            {pokemon.currentHealth}/{pokemon.hp}
          </p>
        </div>
      )}
    </div>
  );
}
