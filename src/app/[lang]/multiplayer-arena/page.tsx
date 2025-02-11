'use client';
import { socket } from '@/app/api';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    console.log('useEffect');

    socket.on('connect', () => {
      console.log('connected');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <h1>Multiplayer</h1>
    </>
  );
}
