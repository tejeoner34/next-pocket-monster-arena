import { ArenaPokemon } from '@/app/models/pokemon-model';

const calculateLifeBarColor = (currentHealth: number, totalHealth: number) => {
  const percentageLife = currentHealth / totalHealth;
  if (percentageLife > 0.4) return 'green';
  if (percentageLife > 0.2) return 'orange';
  return 'red';
};

export default function Lifebar({
  pokemon,
  showLifePoints = true,
}: {
  pokemon: ArenaPokemon;
  showLifePoints?: boolean;
}) {
  return (
    <div className="w-full min-h-[100px] max-w-[350px] bg-[#f5f6da] text-pokemonInfoText flex flex-col justify-evenly items-center border-[7px] border-gray-600 rounded-tl-[20px] rounded-tr-[5px] rounded-br-[20px] rounded-bl-[2px] z-10">
      <div className="text-center">
        <h3 className="uppercase font-bold text-primary">{pokemon.name}</h3>
      </div>
      <div className="w-3/4 h-[22px] relative rounded-lg border-2 border-white">
        <div className="bg-black h-full rounded-lg px-2 font-bold text-orange-500 flex items-center">
          <span>HP</span>
        </div>
        <div className="absolute w-4/5 h-3/4 top-0 bottom-0 right-1 border-2 border-white rounded-lg">
          <div
            className="h-full rounded-lg"
            style={{
              width: pokemon.currentPercentageHealth,
              background: calculateLifeBarColor(pokemon.currentHealth, pokemon.hp),
            }}
          ></div>
        </div>
      </div>

      {showLifePoints && (
        <div className="text-pokemonInfoText">
          <p>
            {pokemon.currentHealth}/{pokemon.hp}
          </p>
        </div>
      )}
    </div>
  );
}
