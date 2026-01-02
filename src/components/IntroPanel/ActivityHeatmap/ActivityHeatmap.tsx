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

	const cellElements: JSX.Element[] = getCellElements(calendarGrid);
	const monthHeaderElements: JSX.Element[] = getMonthHeaderElements(
		activityHeatmapService.getMonthLabels(calendarGrid)
	);
	const dayOfWeekHeaderElements: JSX.Element[] = getDayOfWeekElements();

	return (
		<div className={classes.heatmap_container}>
			<div className={classes.heatmap_content_container}>
				<div
					className={classes.month_header}
					style={{ gridTemplateColumns: `repeat(${calendarGrid[0].length}, 10px)` }}
				>
					{monthHeaderElements}
				</div>
				<div className={classes.heatmap_grid}>{cellElements}</div>
				<div className={classes.day_header}>{dayOfWeekHeaderElements}</div>
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
/*
	How can I identify how many rows and column are needed?
		What I know
		- I know there are 7 rows for sure
	 	- I know first row is Sunday and last row is Saturday
		
		What I can calculate
		- I can calculate offset by checking Jan 1st, 2025's day of week
		- Beginning offset = 7 - jan 1st day of week
			eg if jan 1 is wednesday offset (Sunday, Monday, Tuesday)
		
		How to determine the offsets?
		1. Define custom array [Sunday, Monday, Tuesday, Wednesday,...]
		2. Check day again array to find index

		- I can fill row to find out how many columns I need
	
	
	How can I create a grid and assign value to each cell in the grid
	- I know there is probably going to be 53 columns
	- The first column is going to contain first sunday of month

	- In order to create heatmap I have 3 alterative 
		1. Use table
		pros
		similar to grid, each time will have same heigh and width
		allow header
		easy to setup, dont need to assign column and row index
		
		cons
		might be hard to style single table has default styling

		2. Use grid
		pros
		Heat map is naturally grid, I only need to deal with mapping index issue

		cons
		Require presetup cells
		need to asign cells index during run time?

		3. Use flex layout
		pros 
		fast to setup since all row have same number of columns and all cells are same size

		cons
		Not sure how to position Month header 
*/
