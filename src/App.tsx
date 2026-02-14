import { Route, Routes } from 'react-router-dom';

import type { JSX } from 'react';

import { AboutMePanel } from './components/AboutMePanel/AboutMePanel';
import { CalculationPanelRoute } from './components/CalculationPanel/CalculationPanelRoute';
import { ContactPanel } from './components/ContactPanel/ContactPanel';
import { GameLayout } from './components/GameLayout/GameLayout';
import { IntroPanelRoute } from './components/IntroPanel/IntroPanelRoute';
import { ScorePanelRoute } from './components/ScorePanel/ScorePanelRoute';
import { SettingsPanel } from './components/Settings/SettingsPanel';
import { UpdatesPanel } from './components/UpdatesPanel/UpdatesPanel';
import paths from './routes/routes';

function App(): JSX.Element {
	return (
		<Routes>
			<Route element={<GameLayout />}>
				<Route path={paths.home} element={<IntroPanelRoute />} />
				<Route path={paths.calculate} element={<CalculationPanelRoute />} />
				<Route path={paths.score} element={<ScorePanelRoute />} />
				<Route path={paths.about} element={<AboutMePanel />} />
				<Route path={paths.settings} element={<SettingsPanel />} />
				<Route path={paths.updates} element={<UpdatesPanel />} />
				<Route path={paths.contact} element={<ContactPanel />} />
			</Route>
		</Routes>
	);
}

export default App;
