import { useContext } from 'react';
import { OnlineArenaContext } from '../context/online-arena.context';

export function useOnlineArenaContext() {
  const context = useContext(OnlineArenaContext);
  if (!context) throw new Error('useOnlineArenaContext must be used within an OnlineArenaProvider');
  return context;
}
