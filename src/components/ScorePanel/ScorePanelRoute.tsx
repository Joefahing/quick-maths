import { useOutletContext } from 'react-router-dom';

import type { JSX } from 'react';

import type { GameOutletContext } from '../GameLayout/GameLayoutTypes';

import { ScorePanel } from './ScorePanel';

export function ScorePanelRoute(): JSX.Element {
	const { scorePanelProps } = useOutletContext<GameOutletContext>();
	return <ScorePanel {...scorePanelProps} />;
}
