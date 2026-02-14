import type { JSX } from 'react';

import { ComingSoonCharacter } from './ComingSoonCharacter/ComingSoonCharacter';

import classes from './ComingSoon.module.css';

interface ComingSoonProps {
	pageName: string;
}

export function ComingSoon({ pageName }: ComingSoonProps): JSX.Element {
	return (
		<div className={classes.coming_soon}>
			<div className={classes.message}>
				<h2 className={classes.title}>Coming Soon</h2>
				<h3 className={classes.content}>{pageName} page under construction...</h3>
			</div>
			<div className={classes.coming_soon_character}>
				<ComingSoonCharacter />
			</div>
		</div>
	);
}
