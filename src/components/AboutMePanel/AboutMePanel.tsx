import type { JSX } from 'react';

import { ComingSoon } from '../ComingSoon/ComingSoon';

import classes from './AboutMePanel.module.css';

export function AboutMePanel(): JSX.Element {
	return (
		<div className={classes.about_me}>
			<ComingSoon pageName="About Me" />
		</div>
	);
}
