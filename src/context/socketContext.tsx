import * as React from 'react';
import io from 'socket.io-client';

const serverAddress = import.meta.env.VITE_SERVER_URL;
const portNumber = 3001;
const url = `//${serverAddress}:${portNumber}`;
export interface SocketState {
	connect: boolean;
}
export const socket = io(url);
export const SocketContext = React.createContext(socket);
