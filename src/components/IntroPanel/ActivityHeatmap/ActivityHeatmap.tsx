import { type JSX, useMemo, useRef } from 'react';
import classNames from 'classnames/bind';

import { type Activity, ActivityLevel, type HeaderLabel } from '../../../assets/types';
import { DateStringFormat, DateUtilitiesService, DayIndex } from '../../../shared/services/DateUtilitiesService';
import { ToolTip } from '../../Share/ToolTip/ToolTip';

import { ActivityHeatmapService } from './ActivityHeatmapService';

import classes from './ActivityHeatmap.module.css';

const classNameInit = classNames.bind(classes);

export interface ActivityHeatmapProps {
	year: number;
	activities: Activity[];
}

export function ActivityHeatmap({ year, activities }: ActivityHeatmapProps): JSX.Element {
	const activityHeatmapService: ActivityHeatmapService = useRef<ActivityHeatmapService>(
		new ActivityHeatmapService()
	).current;

	const calendarGrid: (Activity | null)[][] = useMemo(
		() => activityHeatmapService.buildCalendarGrid(year, activities),
		[activityHeatmapService, year, activities]
	);

	// TODO: Will calcuate contribution when data model is done
	const streak: number = 50;

	const cellElements: JSX.Element[] = getCellElements(calendarGrid);
	const monthHeaderElements: JSX.Element[] = getMonthHeaderElements(
		activityHeatmapService.getMonthLabels(calendarGrid)
	);
	const dayOfWeekHeaderElements: JSX.Element[] = getDayOfWeekElements();

	return (
		<div className={classes.heatmap_container}>
			<div className={classes.heatmap_header}>
				<div className={classes.streak_text}>
					Current Streak: <span>{streak} Days</span>
				</div>
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

function getCellElements(calendarGrid: (Activity | null)[][]): JSX.Element[] {
	const cellElements: JSX.Element[] = [];

	for (let col = 0; col < calendarGrid[0].length; col++) {
		for (let row = 0; row < calendarGrid.length; row++) {
			const activitiy: Activity | null = calendarGrid[row][col];
			
			if (activitiy == null) {
				const cellClassName = classNameInit({
					cell: true,
					empty: true
				});
				cellElements.push(<div className={cellClassName} key={`cell_row_${row}_col_${col}`}></div>);
			} else {
				const count: number = activitiy.count;
				const date: Date = new Date(activitiy.date);
				const tooltipContent: string = `${count} runs on ${DateUtilitiesService.getDateString(date, DateStringFormat.MonthDay)}`;

				const cellClassName = classNameInit({
					cell: true,
					none: isActivityLevel(count, ActivityLevel.None),
					low: isActivityLevel(count, ActivityLevel.Low),
					medium: isActivityLevel(count, ActivityLevel.Medium),
					high: isActivityLevel(count, ActivityLevel.High)
				});

				cellElements.push(
					<ToolTip content={tooltipContent} key={`tooltip_row_${row}_col_${col}`}>
						<div className={cellClassName} key={`cell_row_${row}_col_${col}`}></div>
					</ToolTip>
				);
			}
		}
	}

	return cellElements;
}

function isActivityLevel(count: number, level: ActivityLevel): boolean {
	if (count === 0 && level === ActivityLevel.None) return true;
	else if (count === 1 && level === ActivityLevel.Low) return true;
	else if (count === 2 && level === ActivityLevel.Medium) return true;
	else if (count >= 3 && level === ActivityLevel.High) return true;

	return false;
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
