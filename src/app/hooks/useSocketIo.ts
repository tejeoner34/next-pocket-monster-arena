import { useEffect, useRef } from 'react';
import { socket } from '../api';
import {
  ReceiveChallengeType,
  REQUEST_STATUSES,
  SOCKET_RESPONSES,
  SOCKET_ACTIONS,
  MoveDetail,
  ArenaData,
} from '../models';
import { routes } from '../routes';

import { SetInfoBoxMessageType } from './useInfoBoxMessage';
import { useUsersIds } from './useUsersIds';
import { useRouter } from '@/i18n/routing';
import { useChallenge } from './useChallenge';

type UseSocketIoProps = {
  setOnlineArenaData: React.Dispatch<React.SetStateAction<ArenaData>>;
  gameLoop: (data: ArenaData) => Promise<void>;
  setInfoBoxMessage: (value: SetInfoBoxMessageType) => void;
};

export function useSocketIo({ setOnlineArenaData, gameLoop, setInfoBoxMessage }: UseSocketIoProps) {
  const roomId = useRef('');
  const { userId, rivalId, setUserId, setRivalId } = useUsersIds();
  const {
    challengeRequestStatus,
    receivedChallenge,
    rivalLeftArena,
    setRivalLeftArena,
    setChallengeRequestStatus,
    setReceivedChallenge,
    resetChallengeStatus,
  } = useChallenge();
  const router = useRouter();

  const resetOnlineData = () => {
    resetChallengeStatus();
    setReceivedChallenge({} as ReceiveChallengeType);
    resetChallengerData();
  };

  const emit = <T>(eventName: string, data: T) => {
    socket.emit(eventName, data);
  };

  const challengeUser = ({ challengerId, rivalId }: { challengerId: string; rivalId: string }) => {
    setChallengeRequestStatus({ status: REQUEST_STATUSES.PENDING, isSent: true });
    setRivalId(rivalId);
    emit(SOCKET_ACTIONS.challengeUser, { challengerId, rivalId });
  };

  const resetChallengerData = () => {
    setRivalId('');
    setReceivedChallenge({} as ReceiveChallengeType);
  };

  const declineChallenge = () => {
    emit(SOCKET_ACTIONS.challengeResponse, { userId, accept: false, rivalId });
    resetChallengerData();
  };

  const acceptChallenge = () => {
    setChallengeRequestStatus({ status: REQUEST_STATUSES.ACCEPTED, isSent: true });
    emit(SOCKET_ACTIONS.challengeResponse, { userId, accept: true, rivalId });
  };

  const leaveArena = () => {
    emit(SOCKET_ACTIONS.leavesRoom, { userId, roomId: roomId.current });
  };

  const playAgain = () => {
    emit(SOCKET_ACTIONS.rematch, { roomId: roomId.current });
    setOnlineArenaData((prev) => ({
      ...prev,
      isOver: false,
      isArenaReady: false,
    }));
  };

  const gameOver = () => {
    emit(SOCKET_ACTIONS.gameOver, { roomId: roomId.current });
  };

  const chooseMove = (move: MoveDetail) => {
    setOnlineArenaData((prev) => ({
      ...prev,
      isTurnOver: false,
    }));
    setInfoBoxMessage({ type: 'waitingForRival' });
    emit(SOCKET_ACTIONS.chooseMove, {
      userId,
      chosenMove: move,
      roomId: roomId.current,
    });
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    if (socket.id) setUserId(socket.id);

    socket.on('connect', () => {
      setUserId(socket.id || '');
    });

    socket.on(SOCKET_RESPONSES.receiveChallenge, (data: ReceiveChallengeType) => {
      setRivalId(data.challengerId);
      setReceivedChallenge(data);
    });

    socket.on(SOCKET_RESPONSES.challengeAccepted, (data: ArenaData, id: string) => {
      router.push(routes.onlineArena);
      setOnlineArenaData(data);
      roomId.current = id;
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

    socket.on(SOCKET_RESPONSES.newTurn, async (data: ArenaData) => {
      gameLoop(data);
    });

    socket.on(SOCKET_RESPONSES.gameOver, () => {
      setOnlineArenaData((prev) => ({
        ...prev,
        isOver: true,
      }));
    });

    socket.on(SOCKET_RESPONSES.rematch, (data: ArenaData) => {
      setOnlineArenaData(data);
    });

    socket.on(SOCKET_RESPONSES.userDisconnected, () => {
      setRivalLeftArena(true);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  return {
    challengeUser,
    declineChallenge,
    acceptChallenge,
    leaveArena,
    playAgain,
    chooseMove,
    resetOnlineData,
    gameOver,
    userId,
    rivalId,
    challengeRequestStatus,
    receivedChallenge,
    rivalLeftArena,
  };
}
