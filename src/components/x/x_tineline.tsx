import './x_timeline.css';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { useState } from 'react';

function XLoading({ text }: { text: string }) {
	return <div id="x_loading_layout">{text}</div>;
}
export default function XTimeline({ url }: { url: string }) {
	const [loading, setloading] = useState(true);
	return (
		<span className="x_timeline">
			{loading && <XLoading text={`${url} X 타임라인 불러오는중...`} />}
			<TwitterTimelineEmbed
				sourceType="profile"
				screenName={url}
				options={{ height: 500 }}
				onLoad={() => setloading(false)}
			/>
		</span>
	);
}
