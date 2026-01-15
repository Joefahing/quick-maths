import type { JSX } from 'react';

import type { HeaderLabel, UserActivity } from '../../../../assets/types';
import { ActivityHeatmapService } from '../ActivityHeatmapService';

import classes from './ActivityheatMonthHeader.module.css';

export interface ActivityHeatmapMonthHeaderProps {
	calendarGrid: (UserActivity | null)[][];
}

export function ActivityHeatmapMonthHeader({ calendarGrid }: ActivityHeatmapMonthHeaderProps): JSX.Element {
	const monthHeaderElements: JSX.Element[] = getMonthHeaderElements(
		ActivityHeatmapService.getMonthLabels(calendarGrid)
	);

	return (
		<div
			className={classes.month_header}
			style={{ gridTemplateColumns: `repeat(${calendarGrid[0].length}, var(--cell-size))` }}
		>
			{monthHeaderElements}
		</div>
	);
}

function getMonthHeaderElements(headerLabels: HeaderLabel[]): JSX.Element[] {
	return headerLabels.map((header) => (
		<div
			className={classes.label}
			style={{ gridColumnStart: header.gridStart }}
			key={`activity_month_header_${header.gridStart}`}
		>
			{header.text}
		</div>
	));
}
