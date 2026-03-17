import { Route, Routes } from 'react-router-dom';

import { Analytics } from '@vercel/analytics/react';
import type { JSX } from 'react';
import { Provider } from 'react-redux';

import { AboutMePanel } from './components/AboutMePanel/AboutMePanel';
import { CalculationPanel } from './components/CalculationPanel/CalculationPanel';
import { ContactPanel } from './components/ContactPanel/ContactPanel';
import { GameLayout } from './components/GameLayout/GameLayout';
import { IntroPanelRoute } from './components/IntroPanel/IntroPanelRoute';
import { ScorePanelRoute } from './components/ScorePanel/ScorePanelRoute';
import { SettingsPanel } from './components/Settings/SettingsPanel';
import { UpdatesPanel } from './components/UpdatesPanel/UpdatesPanel';
import paths from './routes/routes';
import { store } from './store/store';

function App(): JSX.Element {
	return (
		<Provider store={store}>
			<Routes>
				<Route element={<GameLayout />}>
					<Route path={paths.home} element={<IntroPanelRoute />} />
					<Route path={paths.calculate} element={<CalculationPanel />} />
					<Route path={paths.score} element={<ScorePanelRoute />} />
					<Route path={paths.about} element={<AboutMePanel />} />
					<Route path={paths.settings} element={<SettingsPanel />} />
					<Route path={paths.updates} element={<UpdatesPanel />} />
					<Route path={paths.contact} element={<ContactPanel />} />
				</Route>
			</Routes>
			<Analytics />
		</Provider>
	);
}

export default App;
