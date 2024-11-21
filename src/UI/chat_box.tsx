import { ChatMessage } from '../components/chat/chat';
import './chat_box.css';
function ChatBox({ msg }: { msg: ChatMessage }) {
	return (
		<div id="chatbox_layout">
			{msg.type == 'message' ? (
				<div id="chatbox_message_layout">
					<div id="chatbox_user_layout">
						<p
							id="chatbox_user"
							className="chatbox_user_text">
							{msg.userId}
						</p>
					</div>
					<div id="chatbox_inner_layout">
						<p
							id="chatbox_message"
							className="chatbox_text">
							{msg.message}
						</p>
					</div>
				</div>
			) : (
				<div id="chatbox_connection_layout">
					<p
						id="chatbox_message"
						className="chatbox_text">
						{msg.message}
					</p>
				</div>
			)}
		</div>
	);
}

export default ChatBox;
