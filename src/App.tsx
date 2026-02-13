import { Route, Routes } from 'react-router-dom';

import type { JSX } from 'react';

import { CalculationPanelRoute } from './components/CalculationPanel/CalculationPanelRoute';
import { GameLayout } from './components/GameLayout/GameLayout';
import { IntroPanelRoute } from './components/IntroPanel/IntroPanelRoute';
import { ScorePanelRoute } from './components/ScorePanel/ScorePanelRoute';
import paths from './routes/routes';

function App(): JSX.Element {
	return (
		<Routes>
			<Route element={<GameLayout />}>
				<Route path={paths.home} element={<IntroPanelRoute />} />
				<Route path={paths.calculate} element={<CalculationPanelRoute />} />
				<Route path={paths.score} element={<ScorePanelRoute />} />
			</Route>
		</Routes>
	);
}

export default App;
