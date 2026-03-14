import { BrowserRouter } from 'react-router-dom';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './store/listeners';

import { registerAllListeners } from './store/listeners';
import App from './App.tsx';

import './index.css';
import './shared/styles/theme.dark.css';
import './shared/styles/tokens.css';

registerAllListeners();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>
);
