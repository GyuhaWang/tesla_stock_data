import { useState } from 'react';
import Card from './card';
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
export default function News() {
	const [news, setNews] = useState<StockArticle[]>([
		{
			amp_url:
				'https://m.uk.investing.com/news/stock-market-news/markets-are-underestimating-fed-cuts-ubs-3559968?ampMode=1',
			article_url:
				'https://uk.investing.com/news/stock-market-news/markets-are-underestimating-fed-cuts-ubs-3559968',
			author: 'Sam Boughedda',
			description:
				'UBS analysts warn that markets are underestimating the extent of future interest rate cuts by the Federal Reserve, as the weakening economy is likely to justify more cuts than currently anticipated.',
			id: '8ec638777ca03b553ae516761c2a22ba2fdd2f37befae3ab6fdab74e9e5193eb',
			image_url: 'https://i-invdn-com.investing.com/news/LYNXNPEC4I0AL_L.jpg',
			insights: [
				{
					sentiment: 'positive',
					sentiment_reasoning:
						'UBS analysts are providing a bullish outlook on the extent of future Federal Reserve rate cuts, suggesting that markets are underestimating the number of cuts that will occur.',
					ticker: 'UBS',
				},
			],
			keywords: ['Federal Reserve', 'interest rates', 'economic data'],
			published_utc: '2024-06-24T18:33:53Z',
			publisher: {
				favicon_url:
					'https://s3.polygon.io/public/assets/news/favicons/investing.ico',
				homepage_url: 'https://www.investing.com/',
				logo_url:
					'https://s3.polygon.io/public/assets/news/logos/investing.png',
				name: 'Investing.com',
			},
			tickers: ['UBS'],
			title:
				'Markets are underestimating Fed cuts: UBS By Investing.com - Investing.com UK',
		},
	]);
	return (
		<section id="news_section">
			<div id="x_header">
				<div
					id="header_title"
					className="text_3xl">
					TESLA 뉴스 모아보기
				</div>
				<div>정보제공: polygon.io</div>
			</div>
			<div>
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
