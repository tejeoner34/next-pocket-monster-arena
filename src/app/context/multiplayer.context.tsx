'use client';
import { createContext, ReactNode, useState } from 'react';
import {
  ArenaData,
  ChallengerDataType,
  ChallengeRequestStatus,
  MoveDetail,
  ReceiveChallengeType,
} from '../models';
import { useInfoBoxMessage } from '../hooks/useInfoBoxMessage';
import { useSocketIo } from '../hooks/useSocketIo';
import { useGameLoop } from '../hooks/useGameLoop';

type SocketIoContextType = {
  acceptChallenge: () => void;
  challengeRequestStatus: ChallengeRequestStatus;
  challengeUser: ({ challengerId, rivalId }: { challengerId: string; rivalId: string }) => void;
  chooseMove: (move: MoveDetail) => void;
  declineChallenge: () => void;
  playAgain: () => void;
  infoBoxMessage: string;
  leaveArena: () => void;
  onlineArenaData: ArenaData;
  userId: string;
  receivedChallenge: ReceiveChallengeType;
  rivalId: ChallengerDataType['challengerId'];
  rivalLeftArena: boolean;
  updateOnlineArenaData: (updates: Partial<ArenaData>) => void;
};

export const MultiplayerContext = createContext<undefined | SocketIoContextType>(undefined);

export const MultiplayerProvider = ({ children }: { children: ReactNode }) => {
  const { infoBoxMessage, setInfoBoxMessage } = useInfoBoxMessage();
  const [onlineArenaData, setOnlineArenaData] = useState<ArenaData>({} as ArenaData);

  const handleGameOver = () => {
    gameOver();
  };

  const { gameLoop } = useGameLoop({
    setInfoBoxMessage,
    updateArenaData: setOnlineArenaData,
    gameOver: handleGameOver,
  });

  const {
    acceptChallenge,
    challengeUser,
    chooseMove,
    declineChallenge,
    leaveArena,
    playAgain,
    rivalId,
    userId,
    challengeRequestStatus,
    receivedChallenge,
    rivalLeftArena,
    resetOnlineData,
    gameOver,
  } = useSocketIo({
    gameLoop,
    setInfoBoxMessage,
    setOnlineArenaData,
  });

  const resetArenaData = () => {
    setOnlineArenaData({} as ArenaData);
    resetOnlineData();
  };

  const onLeaveArena = () => {
    resetArenaData();
    leaveArena();
  };

  const updateOnlineArenaData = (updates: Partial<ArenaData>) => {
    setOnlineArenaData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  return (
    <MultiplayerContext.Provider
      value={{
        acceptChallenge,
        challengeRequestStatus,
        challengeUser,
        chooseMove,
        declineChallenge,
        playAgain,
        infoBoxMessage,
        leaveArena: onLeaveArena,
        onlineArenaData,
        userId,
        receivedChallenge,
        rivalId,
        rivalLeftArena,
        updateOnlineArenaData,
      }}
    >
      {children}
    </MultiplayerContext.Provider>
  );
};
