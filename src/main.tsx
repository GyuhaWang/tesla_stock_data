import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SocketContext, socket } from './context/socketContext';
import './index.css';
import Home from './pages/0_0_home/HOME.tsx';

createRoot(document.getElementById('root')!).render(
	// <StrictMode>
	<SocketContext.Provider value={socket}>
		<Home />
	</SocketContext.Provider>
	// </StrictMode>
);
