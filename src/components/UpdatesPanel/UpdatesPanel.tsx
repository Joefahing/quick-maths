import type { JSX } from 'react';

import { ComingSoon } from '../ComingSoon/ComingSoon';

import classes from './UpdatesPanel.module.css';

export function UpdatesPanel(): JSX.Element {
	return (
		<div className={classes.updates}>
			<ComingSoon pageName='Updates Page' />
		</div>
	);
}
