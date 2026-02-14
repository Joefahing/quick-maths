import { type JSX, type ReactNode } from 'react';

import classes from './SideMenuButton.module.css';

export interface SideMenuButtonProps {
	children: ReactNode;
	label: string;
	onClicked: () => void;
}

export function SideMenuButton({ children, label, onClicked }: SideMenuButtonProps): JSX.Element {
	return (
		<button className={classes.side_menu_button} onClick={onClicked}>
			{children}
			<span className={classes.side_menu_button_label}>{label}</span>
		</button>
	);
}
