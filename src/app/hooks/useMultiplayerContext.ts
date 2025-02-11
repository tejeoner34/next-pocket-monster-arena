import { useContext } from 'react';
import { MultiplayerContext } from '../context';

export function useMultiplayerContext() {
  const context = useContext(MultiplayerContext);

  if (!context) {
    throw new Error('useSocketIoContext must be used within an SocketIoProvider');
  }

  return context;
}
