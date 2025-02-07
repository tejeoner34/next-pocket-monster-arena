import { ArenaPokemon } from '@/app/models/pokemon-model';
import Lifebar from './lifebar.component';
import PokemonSprite from './pokemon-sprite.component';

type PokemonInfoProps = {
  pokemon: ArenaPokemon;
};

export default function PokemonInfo({ pokemon }: PokemonInfoProps) {
  return (
    <div className="flex w-full items-start relative justify-around">
      <PokemonSprite sprite={pokemon.sprites.back_default} statusAnimation={pokemon.status} />
      <Lifebar pokemon={pokemon} />
    </div>
  );
}
