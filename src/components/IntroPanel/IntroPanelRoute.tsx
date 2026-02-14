import { useOutletContext } from 'react-router-dom';

import type { JSX } from 'react';

import type { GameOutletContext } from '../GameLayout/GameLayoutTypes';

import { IntroPanel } from './IntroPanel';

export function IntroPanelRoute(): JSX.Element {
	const { introPanelProps } = useOutletContext<GameOutletContext>();
	return <IntroPanel {...introPanelProps} />;
}
