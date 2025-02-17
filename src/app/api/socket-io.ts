import { io } from 'socket.io-client';

// Take this to env variable
const URL = 'http://localhost:3001';

export const socket = io(URL, {
  transports: ['websocket'],
});
