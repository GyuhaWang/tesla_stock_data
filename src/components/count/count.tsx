import { useContext, useEffect, useRef, useState } from 'react';

import { SocketContext } from '../../context/socketContext';
import './count.css';
export interface CountMessage {
	current: number; // 현재 참여자
	today: number; // 오늘 참여자
}
function Count() {
	//--------------state------------------
	const socket = useContext(SocketContext);
	const [today, setToday] = useState<number>(0);
	const [current, setCurrent] = useState<number>(0);

	//----------------useEffect-----------------------------------

	//-------------------chat_socket-------------------
	useEffect(() => {
		socket.on('count', (data: CountMessage) => {
			setToday(data.today);
			setCurrent(data.current);
		});
		return () => {
			socket.off('count');
		};
	}, []);

	//--------------view----------------------------
	return (
		<div id="count_layout">
			<p
				id="today_count"
				className="count_text">
				TODAY: {today} 명
			</p>
			<p
				id="current_count"
				className="count_text">
				현재 접속자: {current} 명
			</p>
		</div>
	);
}

export default Count;
