import { useContext } from 'react';
import { SocketIoContext } from '../context';

export function useSocketIoContext() {
  const context = useContext(SocketIoContext);

  if (!context) {
    throw new Error('useSocketIoContext must be used within an SocketIoProvider');
  }

  return context;
}
