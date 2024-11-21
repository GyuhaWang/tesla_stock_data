import { useContext, useEffect, useRef, useState } from 'react';
import './chat.css';
import ChatBox from '../../UI/chat_box';
import Send from '../../assets/send.svg';
import { SocketContext, SocketState } from '../../context/socketContext';
import Count from '../count/count';

export interface ChatMessage {
	type: 'connect' | 'message' | 'disconnect';
	message: string; // 채팅 메시지 본문
	time: string; // 메시지가 전송된 시간 (ISO 형식 - 서버에서 계산)
	userId: string; // socketId
}

function Chat() {
	//--------------state------------------
	const socket = useContext(SocketContext);
	const input = useRef<HTMLInputElement>(null);
	const messageEndRef = useRef<HTMLDivElement | null>(null);
	const [chatList, setChatList] = useState<ChatMessage[]>([]);
	const [socketId, setSocketId] = useState<string | null>(null);
	const [socketState, setSocketState] = useState<SocketState>({
		connect: false,
	});
	//--------------chat_functions----------

	function onSendChat() {
		if (!socket || !input.current || input.current.value == '') return;
		socket.emit('chat_message', input.current.value);
		input.current.value = '';
	}

	//----------------useEffect-----------------------------------

	// key eventHandler
	useEffect(() => {
		const handleEnterKey = (event: KeyboardEvent) => {
			if (
				event.key === 'Enter' &&
				document.activeElement == input?.current &&
				// focus 에서만 enter 누르면 채팅 가능
				event.isComposing == false
				// isComposing => IME 한국어 2번 렌더링 방지
			) {
				event.preventDefault();

				onSendChat();
			}
		};

		window.addEventListener('keydown', handleEnterKey);

		return () => {
			window.removeEventListener('keydown', handleEnterKey);
		};
	}, []);

	// chat scroll 하단 유지 logic
	useEffect(() => {
		if (!messageEndRef.current) return;
		messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
	}, [chatList]);
	//-------------------chat_socket-------------------
	useEffect(() => {
		socket.on('connect', () => {
			if (socketId == null) {
				setSocketState((prev) => {
					const newState = { ...prev, connect: true };
					return newState;
				});
				setSocketId(socket.id ?? null);
			}
		});
		socket.on('chat_message', (data: ChatMessage) =>
			setChatList((prev) => {
				const newChat = [...prev, data];
				return newChat;
			})
		);
		socket.on('disconnect', () => {
			setSocketState((prev) => {
				const newState = { ...prev, connect: false };
				return newState;
			});
		});
		return () => {
			// socket.disconnect();
			socket.off('chat_message');
		};
	}, []);

	//--------------view----------------------------
	return (
		<div id="chat_layout">
			<div id="chat_header">
				실시간 채팅
				<Count />
			</div>

			<div id="chat_list">
				{socketState.connect ? (
					chatList.map((chat, index) => (
						<div key={chat.time + chat.userId + index + chat.message}>
							<ChatBox msg={chat} />
						</div>
					))
				) : (
					<div id="socket_disconnect_layout">
						채팅 서버 연결이 불안정합니다.
						<br />
						이용에 불편을 드려 죄송합니다.
					</div>
				)}
				<div ref={messageEndRef}></div>
			</div>

			<div id="chat_send">
				<input ref={input} />

				<img
					src={Send}
					onClick={() => onSendChat()}
					className="send_button"
				/>
			</div>
		</div>
	);
}

export default Chat;
