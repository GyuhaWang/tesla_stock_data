import { useState, useEffect, useContext } from 'react';
import { SocketContext, SocketState } from '../../context/socketContext';
import { splitData } from '../../utils/stockDataUtil';
import './stock.css';

export interface StockData {
	price: string | null;
	gap: string | null;
}
export default function Stock() {
	//--------------state------------------
	const socket = useContext(SocketContext);
	const [stockData, setStockData] = useState<string>();
	const [gapData, setGap] = useState<string>();
	const [percentData, setPercent] = useState<string>();
	const [socketState, setSocketState] = useState<SocketState>({
		connect: false,
	});
	//----------------useEffect-----------------------------------

	//-------------------stock_socket-------------------
	useEffect(() => {
		socket.on('connect', () => {
			setSocketState((prev) => {
				const newState = { ...prev, connect: true };
				return newState;
			});
		});

		socket.on('stock_data', (data: StockData) => {
			const stockPrice =
				data?.price != null ? data.price.replace(/[^\d.-]/g, '') ?? '0' : '0';
			setStockData(stockPrice);
			const { gap, percent } = splitData(data.gap ?? '') ?? {
				gap: '0',
				percent: '0',
			};
			setGap(gap);
			setPercent(percent);
		});
		socket.on('disconnect', () => {
			setSocketState((prev) => {
				const newState = { ...prev, connect: false };
				return newState;
			});
		});
		return () => {
			socket.off('stock_data');
		};
	}, []);

	return (
		<section id="stock_section">
			{socketState.connect ? (
				<>
					<div id="stock_header">
						<div id="stock_info">
							<span
								id="tesla_eng"
								className="text_sm">
								TSLA
							</span>
							<span
								id="market_kor"
								className="text_sm kor">
								나스닥
							</span>
						</div>
						<div
							id="tesla_kor"
							className="xlarge_text_kor">
							테슬라
						</div>
					</div>
					<div
						id="space"
						style={{ height: '1.25rem' }}
					/>
					<div id="stock_price_row">
						{stockData != '0' ? (
							<>
								<span
									id="stock_price"
									className="text_3xl">
									{stockData}
								</span>
								<span
									id="currency"
									className="text_sm">
									USD
								</span>
							</>
						) : (
							<div>현재 주식 가격 불러오기 실패...</div>
						)}
					</div>
					<div id="stock_gap_percent">
						<span
							id="stock_gap"
							style={
								Number(gapData) < 0
									? { color: 'rgb(37 99 235 )' }
									: Number(gapData) == 0
									? { color: ' rgb(75 85 99)' }
									: { color: 'rgb(239 68 68)' }
							}
							className={'stock_data_text'}>
							{gapData}
						</span>
						<span
							id="stock_percent"
							style={
								Number(gapData) < 0
									? { color: 'rgb(37 99 235 )' }
									: Number(gapData) == 0
									? { color: 'rgb(75 85 99)' }
									: { color: 'rgb(239 68 68)' }
							}
							className={'stock_data_text'}>
							{percentData}
						</span>
					</div>
				</>
			) : (
				<div className="text_3xl">주식 데이터 로드중...</div>
			)}
		</section>
	);
}
