'use client';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { socket } from '../api';
import {
  ChallengerDataType,
  ChallengeRequestStatus,
  MoveDetail,
  OnlineArenaDataType,
  ReceiveChallengeType,
  REQUEST_STATUSES,
  SOCKET_ACTIONS,
  SOCKET_RESPONSES,
} from '../models';
import { wait } from '../lib';
import { useInfoBoxMessage } from '../hooks/useInfoBoxMessage';

type SocketIoContextType = {
  acceptChallenge: () => void;
  challengeRequestStatus: ChallengeRequestStatus;
  challengeUser: ({ challengerId, rivalId }: { challengerId: string; rivalId: string }) => void;
  chooseMove: (move: MoveDetail) => void;
  declineChallenge: () => void;
  emit: <T>(eventName: string, data: T) => void;
  infoBoxMessage: string;
  onlineArenaData: OnlineArenaDataType;
  onlineId: string;
  receivedChallenge: ReceiveChallengeType;
  rivalId: ChallengerDataType['challengerId'];
  updateOnlineArenaData: (updates: Partial<OnlineArenaDataType>) => void;
};

const defaultRequestStatus: ChallengeRequestStatus = {
  status: REQUEST_STATUSES.PENDING,
  isSent: false,
};

export const MultiplayerContext = createContext<undefined | SocketIoContextType>(undefined);

export const MultiplayerProvider = ({ children }: { children: ReactNode }) => {
  const [onlineId, setOnlineId] = useState<string>('');
  const [rivalId, setRivalId] = useState<ChallengerDataType['challengerId']>('');
  const [receivedChallenge, setReceivedChallenge] = useState<ReceiveChallengeType>(
    {} as ReceiveChallengeType
  );
  const [onlineArenaData, setOnlineArenaData] = useState<OnlineArenaDataType>(
    {} as OnlineArenaDataType
  );
  const [challengeRequestStatus, setChallengeRequestStatus] =
    useState<ChallengeRequestStatus>(defaultRequestStatus);
  const { infoBoxMessage, setInfoBoxMessage } = useInfoBoxMessage();
  const router = useRouter();

  const updateOnlineArenaData = (updates: Partial<OnlineArenaDataType>) => {
    setOnlineArenaData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const emit = <T,>(eventName: string, data: T) => {
    socket.emit(eventName, data);
  };

  const challengeUser = ({ challengerId, rivalId }: { challengerId: string; rivalId: string }) => {
    setChallengeRequestStatus({ status: REQUEST_STATUSES.PENDING, isSent: true });
    setRivalId(rivalId);
    emit(SOCKET_ACTIONS.challengeUser, { challengerId, rivalId });
  };

  const resetChallengerData = () => {
    setRivalId('');
  };

  const declineChallenge = () => {
    emit(SOCKET_ACTIONS.challengeResponse, { userId: onlineId, accept: false, rivalId });
    resetChallengerData();
  };

  const acceptChallenge = () => {
    emit(SOCKET_ACTIONS.challengeResponse, { userId: onlineId, accept: true, rivalId });
  };

  const chooseMove = (move: MoveDetail) => {
    setOnlineArenaData((prev) => ({
      ...prev,
      isTurnOver: false,
    }));
    emit(SOCKET_ACTIONS.chooseMove, {
      userId: onlineId,
      chosenMove: move,
      roomId: onlineArenaData.id,
    });
  };

  const attack = (attacker: string) => {
    setOnlineArenaData((prev) => ({
      ...prev,
      pokemons: {
        ...prev.pokemons,
        [attacker]: {
          ...prev.pokemons[attacker],
          status: 'attacking',
        },
      },
    }));
  };

  const receiveDamage = (receiver: string) => {
    setOnlineArenaData((prev) => ({
      ...prev,
      pokemons: {
        ...prev.pokemons,
        [receiver]: {
          ...prev.pokemons[receiver],
          status: 'stunned',
        },
      },
    }));
  };

  const updateHealthBar = (receiver: string, newData: OnlineArenaDataType) => {
    setOnlineArenaData((prev) => ({
      ...prev,
      pokemons: {
        ...prev.pokemons,
        [receiver]: {
          ...prev.pokemons[receiver],
          currentHealth: newData.pokemons[receiver].currentHealth,
          currentPercentageHealth: newData.pokemons[receiver].currentPercentageHealth,
        },
      },
    }));
  };

  const gameLoop = async (data: OnlineArenaDataType) => {
    const { battleFlow } = data;
    for (const { action, userId, waitTime, isGameOver } of battleFlow) {
      switch (action) {
        case 'attack':
          attack(userId);
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
        emit(SOCKET_ACTIONS.gameOver, { userId, roomId: data.id });
        break;
      }
      await wait(waitTime);
    }
    setOnlineArenaData((prev) => ({
      ...prev,
      isTurnOver: true,
    }));
  };

  useEffect(() => {
    if (socket.id) setOnlineId(socket.id);

    socket.on('connect', () => {
      setOnlineId(socket.id || '');
    });

    socket.on(SOCKET_RESPONSES.receiveChallenge, (data: ReceiveChallengeType) => {
      setRivalId(data.challengerId);
      setReceivedChallenge(data);
    });

    socket.on(SOCKET_RESPONSES.challengeAccepted, (data: OnlineArenaDataType) => {
      router.push('/online-arena/arena');
      setOnlineArenaData(data);
      setInfoBoxMessage({
        type: 'default',
        pokemonName: data.pokemons[socket.id!].name,
      });
    });

    socket.on(SOCKET_RESPONSES.noUserFound, () => {
      setChallengeRequestStatus((prev) => ({ ...prev, status: REQUEST_STATUSES.NO_USER }));
    });

    socket.on(SOCKET_RESPONSES.challengeRejected, () => {
      setChallengeRequestStatus((prev) => ({ ...prev, status: REQUEST_STATUSES.REJECTED }));
    });

    socket.on(SOCKET_RESPONSES.newTurn, async (data: OnlineArenaDataType) => {
      gameLoop(data);
    });

    socket.on(SOCKET_RESPONSES.gameOver, () => {
      setOnlineArenaData((prev) => ({
        ...prev,
        isOver: true,
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <MultiplayerContext.Provider
      value={{
        acceptChallenge,
        challengeRequestStatus,
        challengeUser,
        chooseMove,
        declineChallenge,
        emit,
        infoBoxMessage,
        onlineArenaData,
        onlineId,
        receivedChallenge,
        rivalId,
        updateOnlineArenaData,
      }}
    >
      {children}
    </MultiplayerContext.Provider>
  );
};
