import { PokemonArena } from '@/app/hooks/useArena';
import Lifebar from './lifebar.component';
import PokemonSprite from './pokemon-sprite.component';

type PokemonInfoProps = {
  pokemon: PokemonArena;
};

export default function RivalPokemonInfo({ pokemon }: PokemonInfoProps) {
  return (
    <div className="flex w-full items-start relative justify-around">
      <Lifebar pokemon={pokemon} showLifePoints={false} />
      <PokemonSprite sprite={pokemon.sprites.front_default} />
    </div>
  );
}
