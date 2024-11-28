import { useEffect, useState } from 'react';
import Card from './card';
import Info from '../../assets/info.svg';
import './news.css';

export interface Publisher {
	name: string;
	homepage_url: string;
	logo_url: string;
	favicon_url: string;
}
export interface Insight {
	ticker: string;
	sentiment: 'positive' | 'neutral' | 'negative';
	sentiment_reasoning: string;
}

export interface StockArticle {
	id: string;
	amp_url: string;
	publisher: Publisher;
	title: string;
	author: string;
	published_utc: string; // ISO 8601 날짜 형식
	article_url: string;
	tickers: string[];
	image_url: string;
	description: string;
	keywords: string[];
	insights: Insight[];
}
const serverAddress = import.meta.env.VITE_SERVER_URL;
const portNumber = 3001;
export default function News() {
	const [showInfo, setShowInfo] = useState(false);
	const [news, setNews] = useState<StockArticle[]>([
	]);

	useEffect(()=>{
		const getNewskData = async () => {
			try {
				const res = await fetch(
					`http://${serverAddress}:${portNumber}/stock/news`
				);

				if (!res.ok) {
					throw new Error(`HTTP error! Status: ${res.status}`);
				}

				const data = await res.json();
				console.log('Fetched stock data:', data);

				setNews(data);
			} catch (error) {
				console.error('Failed to fetch stock data:', error);
			}
		};

		getNewskData();
	},[])
	return (
		<section id="news_section">
			<div id="x_header">
				<div
					id="header_title"
					className="section_title">
					TESLA 뉴스 모아보기
				</div>
				<div id="info_section">
					<img
						id="info_button"
						onMouseEnter={() => setShowInfo(true)}
						onMouseLeave={() => setShowInfo(false)}
						src={Info}
					/>
					{showInfo && (
						<div
							id="info_modal"
							className="text_md border_gray">
							뉴스정보는 ploygon.io api를 활용하여 제공되고있습니다. 최신 뉴스는
							매일 오전 9시에 업로드됩니다.
						</div>
					)}
				</div>
			</div>
			<div id="news_scroll_row">
				{news.map((article, index) => (
					<Card
						key={article.id}
						article={article}
					/>
				))}
			</div>
		</section>
	);
}
