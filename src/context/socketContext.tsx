import * as React from 'react';
import io, { Socket } from 'socket.io-client';

const serverAddress = 'localhost';
const portNumber = 3001;
const url = `http://${serverAddress}:${portNumber}`;
export interface SocketState {
	connect: boolean;
}
export const socket = io(url);
export const SocketContext = React.createContext(socket);
