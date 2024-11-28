import Chat from '../../components/chat/chat';
import News from '../../components/news/news';
import Stock from '../../components/stock/stock';
import X from '../../components/x/x';

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
					<div className="spacer_10" />
					<X />
					<div className="spacer_10" />
					<News />
					<div className="spacer_10" />
				</section>
			</div>
		</div>
	);
}

export default Home;
