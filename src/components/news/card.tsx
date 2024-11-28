import { useMemo, useState } from 'react';
import './card.css';
import { Insight, StockArticle } from './news';

function InsightBubble({ insight }: { insight: Insight }) {
	const [isHover, setIsHover] = useState(false);
	return (
		<div
			id="insight_bubble_layout"
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			style={{
				backgroundColor:
					insight.sentiment == 'negative'
						? 'rgb(255, 69, 0)'
						: insight.sentiment == 'positive'
						? 'rgb(30, 144, 255)'
						: 'white',
			}}>
			{isHover && (
				<div className="hover_modal">
					<p id="hover_modal_text">{insight.sentiment_reasoning}</p>
				</div>
			)}
			<p
				id="insight_bubble_text"
				style={{ color: insight.sentiment == 'neutral' ? 'black' : undefined }}>
				{insight.sentiment == 'negative'
					? '악재'
					: insight.sentiment == 'positive'
					? '호재'
					: '중립'}
			</p>
		</div>
	);
}
export default function Card({ article }: { article: StockArticle }) {
	const tslaInsights = useMemo(() => {
		const filteredInsights = article.insights
		.filter(
			(value) => value.ticker == 'TSLA'
		);
		return filteredInsights;
	}, [article.insights]);
	return (
		<div id="card_layout">
			<div id="card_header_layout">
				<a
					id="card_title"
					target="_blank"
					href={article.article_url}>
					{article.title}
				</a>
			</div>
			<div id="card_body_layout">
				<div id="insights_row">
					{tslaInsights.map((insight, index) => (
						<InsightBubble
							key={index}
							insight={insight}
						/>
					))}
				</div>
				<div id="news_body">
					<div id="news_info">
						<div
							id="news_author"
							className="text_sm">
							{article.author}
						</div>
						<div
							id="news_date"
							className="text_xs">
							{Intl.DateTimeFormat('Ko-kr').format(
								Date.parse(article.published_utc)
							)}
						</div>
					</div>
					<div
						id="news_description"
						className="text_box">
						{article.description}
					</div>
					{article.image_url && (
						<div id="news_img">
							<img src={article.image_url} />
						</div>
					)}
				</div>
			</div>
			<div id="card_footer_layout">
				<div className="text_xs">키워드:</div>
				{article.keywords.map((keyword, index) => (
					<div
						key={index}
						className="text_xs">
						{keyword}
						{index < article.keywords.length - 1 ? ',' : null}
					</div>
				))}
			</div>
		</div>
	);
}
