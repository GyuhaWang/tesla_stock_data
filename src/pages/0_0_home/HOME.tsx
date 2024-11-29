import Chat from '../../components/chat/chat';
import News from '../../components/news/news';
import Stock from '../../components/stock/stock';
import X from '../../components/x/x';
import { Helmet } from 'react-helmet';
import './HOME.css';

function Home() {
	return (
		<>
			<Helmet>
				<title>TSLA | 최신 정보 모아보기</title>
				<meta
					name="description"
					content="테슬라 최신 뉴스, 트위터(X) 주식정보를 받아보세요. 실시간 채팅으로 테슬라 주주들과 이야기해보세요/"
				/>
				<meta
					name="keywords"
					content="테슬라, 주식, tesla, x, 종목토론방, 종토방"
				/>
			</Helmet>
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
		</>
	);
}

export default Home;
