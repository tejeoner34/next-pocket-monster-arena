import { useState, useEffect } from 'react';

export function useGameStyleMessage(message: string, delay: number = 25) {
  const [typedMessage, setTypedMessage] = useState('');

  useEffect(() => {
    if (!message) return;

    let currentMessage = '';
    let index = 0;

    const interval = setInterval(() => {
      if (index < message.length) {
        currentMessage += message[index];
        setTypedMessage(currentMessage);
        index++;
      } else {
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [message, delay]);

  return { typedMessage };
}
