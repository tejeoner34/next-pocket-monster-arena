import { ArenaPokemon } from '@/app/models/pokemon-model';
import Lifebar from './lifebar.component';
import PokemonSprite from './pokemon-sprite.component';

type PokemonInfoProps = {
  pokemon: ArenaPokemon;
};

export default function RivalPokemonInfo({ pokemon }: PokemonInfoProps) {
  return (
    <div className="flex w-full items-start relative justify-around">
      <Lifebar pokemon={pokemon} showLifePoints={false} />
      <PokemonSprite sprite={pokemon.sprites.front_default} statusAnimation={pokemon.status} />
    </div>
  );
}
