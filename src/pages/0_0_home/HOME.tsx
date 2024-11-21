import Chat from '../../components/chat/chat';
import Stock from '../../components/stock/stock';

import './HOME.css';

function Home() {
	return (
		<div
			id="root_screen"
			className="screen">
			<div
				id="root_layout"
				className="layout">
				<section id="chat_section">
					<Chat />
				</section>
				<section id="content_section">
					{/* <div id="stock_section">stock</div> */}
					<Stock />

					<div id="x_section">X</div>
				</section>
			</div>
		</div>
	);
}

export default Home;
