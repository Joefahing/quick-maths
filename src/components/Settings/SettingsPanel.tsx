import type { JSX } from 'react';

import { ComingSoon } from '../ComingSoon/ComingSoon';

import classes from './SettingsPanel.module.css';

export function SettingsPanel(): JSX.Element {
	return (
		<div className={classes.settings}>
			<ComingSoon pageName="Settings" />
		</div>
	);
}
