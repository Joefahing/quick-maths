import { type JSX, type MouseEvent, type ReactNode } from 'react';

import classes from './SideMenuButton.module.css';

export interface SideMenuButtonProps {
	children: ReactNode;
	label: string;
	onClicked: () => void;
}

export function SideMenuButton({ children, label, onClicked }: SideMenuButtonProps): JSX.Element {
	
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.currentTarget.blur();
		onClicked();
	}

	return (
		<button className={classes.side_menu_button} onClick={handleClick}>
			{children}
			<span className={classes.side_menu_button_label}>{label}</span>
		</button>
	);
}
