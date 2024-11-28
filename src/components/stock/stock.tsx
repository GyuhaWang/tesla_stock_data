import { useState, useEffect } from 'react';

import StockDataBox from '../../UI/stock_data_box';
import Info from '../../assets/info.svg';
import './stock.css';

export interface StockData {
	T: string; // 주식 심볼 (예: "AAPL")
	v: number; // 거래량 (Volume)
	vw: number; // 거래량 가중 평균가 (Volume-weighted average price)
	o: number; // 시가 (Open price)
	c: number; // 종가 (Close price)
	h: number; // 최고가 (High price)
	l: number; // 최저가 (Low price)
	t: number; // 타임스탬프 (Timestamp in milliseconds)
	n: number; // 거래 횟수 (Number of trades)
}
const serverAddress = import.meta.env.VITE_SERVER_URL;
const portNumber = 3001;


export default function Stock() {
	const [stockData, setStockData] = useState<StockData>();
	const [showInfo, setShowInfo] = useState(false);
	// ----------------- getStockData --------------------

	useEffect(() => {
		

		const getStockData = async () => {
			try {
				const res = await fetch(
					`http://${serverAddress}:${portNumber}/stock/openclose`
				);

				if (!res.ok) {
					throw new Error(`HTTP error! Status: ${res.status}`);
				}

				const data = await res.json();
				console.log('Fetched stock data:', data);

				setStockData(data);
			} catch (error) {
				console.error('Failed to fetch stock data:', error);
			}
		};

		getStockData();
	}, [serverAddress]);

	return (
		<section id="stock_section">
			 <div id="stock_header">
						<div id="stock_info">
							<span
								id="tesla_eng"
								className="text_sm">
								{stockData?.T}
							</span>
							<span
								id="market_kor"
								className="text_sm kor">
								나스닥
							</span>
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
							비용 문제로 실시간 주식 정보를 제공하지 못하고 있습니다.<br/>
							어제의 주식 가격이 제공되며 업데이트 시간은 매일 오전 7시 입니다. <br/>
							빠른 시일내로 실시간 주식 가격 정보를 제공할 수 있도록 하겠습니다.
						</div>
					)}
				</div>
						</div>
						<div
							id="tesla_kor"
							className="section_title">
							테슬라
						</div>
						<div>

						
						</div>
					</div>
					<div
						id="space"
						style={{ height: '1rem' }}
					/>
					<div id="stock_price_row">
					<StockDataBox title='거래량' value={stockData?.v??0} formatType="number"/>
					<StockDataBox title='시가' value={stockData?.o??0} formatType="number"/>
					<StockDataBox title='종가' value={stockData?.c??0} formatType="number"/>
					<StockDataBox title='최고가' value={stockData?.h??0} formatType="number"/>
					<StockDataBox title='최저가' value={stockData?.l??0} formatType="number"/>
					

						
					
					
					</div>
					<div className='text_xs'>업데이트 날짜 : {Intl.DateTimeFormat('ko-KR').format(stockData?.t??0)}</div>
			
		</section>
	);
}
