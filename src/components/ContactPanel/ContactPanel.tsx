import type { JSX } from 'react';

import { ComingSoon } from '../ComingSoon/ComingSoon';

import classes from './ContactPanel.module.css';

export function ContactPanel(): JSX.Element {
	return (
		<div className={classes.contact}>
			<ComingSoon pageName={'Contact Page'} />
		</div>
	);
}
