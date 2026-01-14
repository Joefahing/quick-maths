import classNames from 'classnames/bind';
import type { JSX } from 'react';

import { ActivityLevel, type UserActivity } from '../../../../assets/types';
import { DateStringFormat, DateUtilitiesService } from '../../../../shared/services/DateUtilitiesService';
import { ToolTip } from '../../../Share/ToolTip/ToolTip';

import classes from './ActivityHeatmapGrid.module.css';

const cx = classNames.bind(classes);

export interface ActivityHeatmapGridProps {
	calendarGrid: (UserActivity | null)[][];
}

export function ActivityHeatmapGrid({ calendarGrid }: ActivityHeatmapGridProps): JSX.Element {
	const cellElements: JSX.Element[] = getCellElements(calendarGrid);
	return <div className={classes.heatmap_grid}>{cellElements}</div>;
}

function getCellElements(calendarGrid: (UserActivity | null)[][]): JSX.Element[] {
	const cellElements: JSX.Element[] = [];

	for (let col = 0; col < calendarGrid[0].length; col++) {
		for (let row = 0; row < calendarGrid.length; row++) {
			const userActivity: UserActivity | null = calendarGrid[row][col];

			if (userActivity == null) {
				const cellClassName = cx('cell', 'empty');
				cellElements.push(<div className={cellClassName} key={`cell_row_${row}_col_${col}`} />);
				continue;
			}

			const count: number = userActivity.count;
			const date: Date = new Date(userActivity.date);
			const tooltipContent: string = `${count} runs on ${DateUtilitiesService.getDateString(
				date,
				DateStringFormat.MonthDay
			)}`;

			const cellClassName = cx('cell', {
				low: isActivityLevel(count, ActivityLevel.Low),
				medium: isActivityLevel(count, ActivityLevel.Medium),
				high: isActivityLevel(count, ActivityLevel.High)
			});

			cellElements.push(
				<ToolTip content={tooltipContent} key={`tooltip_row_${row}_col_${col}`}>
					<div className={cellClassName} />
				</ToolTip>
			);
		}
	}

	return cellElements;
}

function isActivityLevel(count: number, level: ActivityLevel): boolean {
	if (count === 1 && level === ActivityLevel.Low) return true;
	if (count === 2 && level === ActivityLevel.Medium) return true;
	if (count >= 3 && level === ActivityLevel.High) return true;
	return false;
}
