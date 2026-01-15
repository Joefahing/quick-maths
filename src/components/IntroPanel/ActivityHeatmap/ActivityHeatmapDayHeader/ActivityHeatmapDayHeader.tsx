import type { JSX } from 'react';

import type { HeaderLabel } from '../../../../assets/types';
import { DayIndex } from '../../../../shared/services/DateUtilitiesService';

import classes from './ActivityHeatmapDayHeader.module.css';

export function ActivityHeatmapDayHeader(): JSX.Element {
	const dayOfWeekHeaderElements: JSX.Element[] = getDayOfWeekElements();
	return <div className={classes.day_header}>{dayOfWeekHeaderElements}</div>;
}

function getDayOfWeekElements(): JSX.Element[] {
	const dayHeaders: HeaderLabel[] = [
		{ text: 'Mon', gridStart: DayIndex.Mon + 1 },
		{ text: 'Wed', gridStart: DayIndex.Wed + 1 },
		{ text: 'Fri', gridStart: DayIndex.Fri + 1 }
	];

	return dayHeaders.map((header) => (
		<div
			className={classes.label}
			style={{ gridRowStart: header.gridStart }}
			key={`activity_day_header_${header.gridStart}`}
		>
			{header.text}
		</div>
	));
}
