import io from 'socket.io-client';

let socket = null;

export const getSocket = () => socket;

export const connectSocket = () => {
  if (!socket) {
    socket = io('http://localhost:9000/', {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      randomizationFactor: 0.5,
      transports: ['websocket', 'polling']
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}; 