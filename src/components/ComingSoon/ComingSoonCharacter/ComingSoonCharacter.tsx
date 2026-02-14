import type { JSX } from 'react';

import './ComingSoonCharacter.css';

export function ComingSoonCharacter(): JSX.Element {
	const outline: string = '#cbd5e1'; // light slate (visible on dark bg)
	const shadow: string = '#94a3b8'; // slightly darker outline
	const skin: string = '#f5c6a5';
	const hair: string = '#7c5e4a';
	const shirt: string = '#4f83ff';
	const desk: string = '#8b6b4a';
	const keyboard: string = '#64748b';
	const keyboardHi: string = '#94a3b8';
	const screen: string = '#8ad1ff';

	return (
		<svg
			className="pixelScene"
			width="160"
			height="160"
			viewBox="0 0 16 16"
			shapeRendering="crispEdges"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Pixel character typing on a computer"
		>
			{/* ===== Bubble (optional bob) ===== */}
			<g className="bubble">
				<rect x="14" y="4" width="1" height="1" fill={outline} />
			</g>

			{/* ===== Monitor ===== */}
			<g>
				<rect x="11" y="2" width="4" height="3" fill={outline} />
				<rect x="12" y="3" width="2" height="1" fill={screen} />
				<rect x="12" y="5" width="2" height="1" fill={shadow} />
				<rect x="13" y="6" width="1" height="1" fill={shadow} />

				{/* Cursor blink inside monitor (tiny pixel) */}
				<rect className="cursor" x="14" y="3" width="1" height="1" fill={outline} />
			</g>

			{/* ===== Desk ===== */}
			<rect x="2" y="10" width="13" height="2" fill={desk} />

			{/* ===== Keyboard ===== */}
			<rect x="9" y="9" width="6" height="1" fill={keyboard} />
			<rect x="10" y="9" width="4" height="1" fill={keyboardHi} />

			{/* ===== Character ===== */}
			<g>
				{/* Hair */}
				<rect x="4" y="3" width="4" height="1" fill={hair} />
				<rect x="3" y="4" width="1" height="1" fill={hair} />
				<rect x="8" y="4" width="1" height="1" fill={hair} />

				{/* Head */}
				<rect x="4" y="4" width="4" height="3" fill={skin} />
				<rect x="3" y="7" width="6" height="1" fill={skin} />

				{/* Eyes (blink by toggling opacity/scale) */}
				<rect className="eye eyeLeft" x="5" y="5" width="1" height="1" fill={outline} />
				<rect className="eye eyeRight" x="7" y="5" width="1" height="1" fill={outline} />

				{/* Shirt */}
				<rect x="4" y="8" width="4" height="2" fill={shirt} />

				{/* Arms (typing nudge) */}
				<g className="hands">
					<rect x="8" y="8" width="1" height="1" fill={skin} />
					<rect x="9" y="8" width="1" height="1" fill={skin} />
					<rect x="8" y="9" width="1" height="1" fill={skin} />
				</g>

				{/* Chair + legs */}
				<rect x="2" y="8" width="2" height="2" fill={shadow} />
				<rect x="2" y="7" width="1" height="1" fill={shadow} />
				<rect x="4" y="12" width="2" height="2" fill={shadow} />
				<rect x="6" y="12" width="2" height="2" fill={shadow} />
			</g>
		</svg>
	);
}
