import Chat from '../../components/chat/chat';
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
					<div>뉴스</div>
					<div>채용</div>
					<div>구글 검색량</div>
				</section>
			</div>
		</div>
	);
}

export default Home;
