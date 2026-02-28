import { type JSX } from 'react';
import classNames from 'classnames/bind';

import classes from './GroupToggleButtons.module.css';

const cx = classNames.bind(classes);

export interface GroupToggleButton<T> {
	text: string;
	value: T;
}

export interface GroupToggleButtonsProps<T> {
	buttons: GroupToggleButton<T>[];
	onGroupToggleButtonClicked: (value: T) => void;
	selectedValue?: T;
}

export function GroupToggleButtons<T>({
	buttons,
	onGroupToggleButtonClicked,
	selectedValue
}: GroupToggleButtonsProps<T>): JSX.Element {
	return (
		<div className={classes.group_toggle_buttons}>
			{buttons.map((button) => (
				<button
					key={`${button.text}-${String(button.value)}`}
					type="button"
					className={cx({ selected: selectedValue === button.value })}
					onClick={() => onGroupToggleButtonClicked(button.value)}
				>
					{button.text}
				</button>
			))}
		</div>
	);
}
