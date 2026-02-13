import { useOutletContext } from 'react-router-dom';

import type { JSX } from 'react';

import { type GameOutletContext } from '../GameLayout/GameLayoutTypes';

import { CalculationPanel } from './CalculationPanel';

export function CalculationPanelRoute(): JSX.Element {
	const { calculationPanelProps } = useOutletContext<GameOutletContext>();
	return <CalculationPanel {...calculationPanelProps} />;
}
