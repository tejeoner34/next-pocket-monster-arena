import { PokemonArena } from '@/app/hooks/useArena';
import Lifebar from './lifebar.component';
import PokemonSprite from './pokemon-sprite.component';

type PokemonInfoProps = {
  pokemon: PokemonArena;
};

export default function PokemonInfo({ pokemon }: PokemonInfoProps) {
  return (
    <div className="flex w-full items-start relative justify-around">
      <PokemonSprite sprite={pokemon.sprites.back_default} />
      <Lifebar pokemon={pokemon} />
    </div>
  );
}
