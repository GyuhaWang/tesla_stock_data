import './x.css';

import XTimeline from './x_tineline';

export default function X() {
	return (
		<section id="x_section">
			<div
				id="x_header"
				className="section_title">
				X(twitter)
			</div>
			<div id="x_scroll_layout">
				<XTimeline url="Tesla" />
				<XTimeline url="elonmusk" />
				<XTimeline url="SpaceX" />
			</div>
		</section>
	);
}
