'use client';
import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { usePokemon } from '../hooks';
import {
  getMostEffectiveMove,
  getMoveEffectivinesInfo,
  getPercentageString,
  getRemainingHP,
  getTurnOrder,
  modifyPokemonHealth,
  updatePokemonStatus,
  wait,
} from '../lib';
import { ArenaData, ArenaPokemon, MoveDetail, Pokemon, ReceivedMoveDetail } from '../models';
import { useInfoBoxMessage } from '../hooks/useInfoBoxMessage';
import { createBattleFlow } from '../models/battleFlow';

type ArenaContextType = {
  arenaData: ArenaData;
  isLoading: boolean;
  chooseMove: (move: MoveDetail) => void;
  userId: string;
  rivalId: string;
  infoBoxMessage: string;
};

export const ArenaContext = createContext<ArenaContextType | undefined>(undefined);

export function ArenaProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string>('');
  const [rivalId, setRivalId] = useState<string>('');
  const { data: pokemons, isLoading } = usePokemon();
  const [arenaData, setArenaData] = useState<ArenaData>({} as ArenaData);
  const { infoBoxMessage, setInfoBoxMessage } = useInfoBoxMessage();

  const updateArenaData = (updates: Partial<ArenaData>) => {
    setArenaData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const chooseMove = (move: MoveDetail) => {
    console.log('MOVE', move);
    setArenaData((prev) => ({
      ...prev,
      isTurnOver: false,
    }));
    const rivalMove = getMostEffectiveMove(
      arenaData.pokemons[rivalId].arenaMoves,
      arenaData.pokemons[userId].processedTypes
    );
    const updatedArenaData: ArenaData = {
      ...arenaData,
      chosenMoves: {
        [userId]: move,
        [rivalId]: rivalMove,
      },
      pokemons: {
        [userId]: updatePokemonHealth(
          arenaData.pokemons[userId],
          arenaData.pokemons[rivalId],
          rivalMove
        ),
        [rivalId]: updatePokemonHealth(
          arenaData.pokemons[rivalId],
          arenaData.pokemons[userId],
          move
        ),
      },
    };

    const battleFlow = createBattleFlow(userId, rivalId, updatedArenaData);
    gameLoop({ ...updatedArenaData, battleFlow });
  };

  const updatePokemonHealth = (
    pokemon: ArenaPokemon,
    attackerPokemon: ArenaPokemon,
    move: MoveDetail
  ): ArenaPokemon => {
    const updatedPokemon = { ...pokemon };
    const moveEffectiviness = getMoveEffectivinesInfo(
      move.type.name,
      arenaData.pokemons[rivalId].processedTypes[0]
    ).value;

    const remainingHP = getRemainingHP({
      pokemonHP: updatedPokemon.currentHealth,
      receivedAttackEffectivinessIndex: moveEffectiviness,
      attackerBasePower: attackerPokemon.power,
      attacksPower: move.power,
    });

    updatedPokemon.currentHealth = remainingHP;
    updatedPokemon.currentPercentageHealth = getPercentageString(remainingHP, pokemon.hp);
    updatedPokemon.isAlive = updatedPokemon.currentHealth > 0;
    updatedPokemon.status = updatedPokemon.isAlive ? 'idle' : 'defeated';
    return updatedPokemon;
  };

  useEffect(() => {
    if (pokemons) {
      const createRandomId = () => {
        const id = Math.random().toString(36).substring(2, 15);
        return id;
      };
      const newUserId = createRandomId();
      const newRivalId = createRandomId();
      setUserId(newUserId);
      setRivalId(newRivalId);
      const myPokemon = initiatePokemonForArena(pokemons[0]);
      const rivalPokemon = initiatePokemonForArena(pokemons[1]);
      const arenaPokemons = {
        [newUserId]: myPokemon,
        [newRivalId]: rivalPokemon,
      };
      updateArenaData({
        users: [newUserId, newRivalId],
        pokemons: arenaPokemons,
        isOver: false,
        turnOrder: getTurnOrder(arenaPokemons),
        isTurnOver: true,
        isArenaReady: true,
      });
    }
  }, [pokemons]);

  const attack = (
    pokemonName: ArenaPokemon['name'],
    moveName: MoveDetail['name'],
    attacker: string
  ) => {
    setInfoBoxMessage({
      type: 'attack',
      pokemonName,
      moveName,
    });
    setArenaData((prev) => updatePokemonStatus('attacking', attacker, prev));
  };

  const receiveDamage = (receiver: string) => {
    setArenaData((prev) => updatePokemonStatus('stunned', receiver, prev));
  };

  const updateHealthBar = (receiver: string, newData: ArenaData) => {
    setArenaData((prev) => modifyPokemonHealth(prev, newData, receiver));
  };

  const gameOver = () => {
    updateArenaData({
      isOver: true,
      isTurnOver: true,
    });
  };

  const gameLoop = async (data: ArenaData) => {
    const { battleFlow } = data;
    for (const {
      action,
      userId,
      waitTime,
      isGameOver,
      moveName,
      pokemonName,
      effectivinessInfo,
    } of battleFlow) {
      switch (action) {
        case 'attack':
          attack(pokemonName, moveName, userId);
          break;
        case 'receiveDamage':
          receiveDamage(userId);
          break;
        case 'updateHealthBar':
          updateHealthBar(userId, data);
          break;
        default:
          break;
      }
      if (isGameOver) {
        gameOver();
        break;
      }
      if (effectivinessInfo) {
        await wait(waitTime);
        setInfoBoxMessage({
          type: effectivinessInfo.label,
        });
      }
      await wait(waitTime);
    }
    setArenaData((prev) => ({
      ...prev,
      isTurnOver: true,
    }));
  };

  return (
    <ArenaContext.Provider
      value={{ arenaData, isLoading, chooseMove, userId, rivalId, infoBoxMessage }}
    >
      {children}
    </ArenaContext.Provider>
  );
}

export const useArenaContext = () => {
  const context = useContext(ArenaContext);
  if (!context) {
    throw new Error('useArenaContext must be used within an ArenaProvider');
  }
  return context;
};

const initiatePokemonForArena = (pokemon: Pokemon): ArenaPokemon => ({
  ...pokemon,
  currentHealth: pokemon.hp,
  currentPercentageHealth: '100%',
  isAlive: true,
  status: 'idle',
  receivedAttackData: {} as ReceivedMoveDetail,
});
