import { type JSX, useMemo, useRef } from 'react';
import classNames from 'classnames/bind';

import type { HeaderLabel } from '../../../assets/types';
import { DateUtilityService, DayIndex } from '../../../shared/services/DateService';

import { ActivityHeatMapService } from './ActivityHeatmapService';

import classes from './ActivityHeatmap.module.css';

const classNameInit = classNames.bind(classes);

export function ActivityHeatmap(): JSX.Element {
	const activityHeatmapService: ActivityHeatMapService = useRef<ActivityHeatMapService>(
		new ActivityHeatMapService()
	).current;
	const calendarGrid: (Date | null)[][] = useMemo<(Date | null)[][]>(() => {
		const currentYear: number = DateUtilityService.getCurrentUTCYear();
		return activityHeatmapService.getCalendarGridByYear(currentYear);
	}, []);

	// Todo: Will calcuate contribution when data model is done
	const streak: number = 50;

	const cellElements: JSX.Element[] = getCellElements(calendarGrid);
	const monthHeaderElements: JSX.Element[] = getMonthHeaderElements(
		activityHeatmapService.getMonthLabels(calendarGrid)
	);
	const dayOfWeekHeaderElements: JSX.Element[] = getDayOfWeekElements();

	return (
		<div className={classes.heatmap_container}>
			<div className={classes.heatmap_header}>
				{/* <div className={classes.runs_text}><span>{runs}</span> Math runs this year</div> */}
				<div className={classes.streak_text}>Current Streak: <span>{streak} Days</span></div>
			</div>
			<div className={classes.heatmap_wrapper}>
				<div className={classes.heatmap_content}>
					<div
						className={classes.month_header}
						style={{ gridTemplateColumns: `repeat(${calendarGrid[0].length}, var(--cell-size))` }}
					>
						{monthHeaderElements}
					</div>
					<div className={classes.heatmap_grid}>{cellElements}</div>
					<div className={classes.day_header}>{dayOfWeekHeaderElements}</div>
				</div>
			</div>
		</div>
	);
}

function getCellElements(calendarGrid: (Date | null)[][]): JSX.Element[] {
	const cellElements: JSX.Element[] = [];

	for (let col = 0; col < calendarGrid[0].length; col++) {
		for (let row = 0; row < calendarGrid.length; row++) {
			const cellClassName = classNameInit({
				cell: true,
				empty: calendarGrid[row][col] == null
			});
			const element: JSX.Element = <div className={cellClassName} key={`cell_row_${row}_col_${col}`}></div>;
			cellElements.push(element);
		}
	}

	return cellElements;
}

function getMonthHeaderElements(headerLabels: HeaderLabel[]): JSX.Element[] {
	return headerLabels.map((header) => {
		return (
			<div
				className={classes.label}
				style={{ gridColumnStart: header.gridStart }}
				key={`activity_month_header_${header.gridStart}`}
			>
				{header.text}
			</div>
		);
	});
}

function getDayOfWeekElements(): JSX.Element[] {
	const dayHeaders: HeaderLabel[] = [
		{ text: 'Mon', gridStart: DayIndex.Mon + 1 },
		{ text: 'Wed', gridStart: DayIndex.Wed + 1 },
		{ text: 'Fri', gridStart: DayIndex.Fri + 1 }
	];

	return dayHeaders.map((header) => {
		return (
			<div
				className={classes.label}
				style={{ gridRowStart: header.gridStart }}
				key={`activity_day_header_${header.gridStart}`}
			>
				{header.text}
			</div>
		);
	});
}
