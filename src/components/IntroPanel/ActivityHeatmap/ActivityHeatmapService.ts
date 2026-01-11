import type { Activity, HeaderLabel } from '../../../assets/types';
import { DateStringFormat, DateUtilitiesService } from '../../../shared/services/DateUtilitiesService';

export class ActivityHeatmapService {
	public getMonthLabels(calendarGrid: (Activity | null)[][]): HeaderLabel[] {
		if (calendarGrid[0].length === 0) {
			//TODO: implement error page
			throw new Error('Calendar grid cannot be empty');
		}

		const sundays: (Activity | null)[] = calendarGrid[0];
		const headerLabels: HeaderLabel[] = [];
		let pastSunday: Date | null = null;

		for (let i = 0; i < sundays.length; i++) {
			const currentSundayActivity: Activity | null = sundays[i];
			if (currentSundayActivity == null) continue;

			const currentSunday: Date = new Date(currentSundayActivity.date);

			if (Number.isNaN(currentSunday.getTime())) continue;
			if (pastSunday != null && currentSunday.getUTCMonth() === pastSunday.getUTCMonth()) continue;

			headerLabels.push({
				text: DateUtilitiesService.getMonthAbbreviationByDate(currentSunday),
				gridStart: i + 1
			});

			pastSunday = currentSunday;
		}

		return headerLabels;
	}

	public buildCalendarGrid(year: number, activities: Activity[]): (Activity | null)[][] {
		const calendarGrid: (Activity | null)[][] = this.getCalendarGridByYear(year);

		const activitiesRecord: Record<string, number> = {};

		for (const activity of activities) {
			activitiesRecord[activity.date] = activity.count;
		}

		for (const row of calendarGrid) {
			for (let col = 0; col < row.length; col++) {
				const cell: Activity | null = row[col];
				if (cell == null || activitiesRecord[cell.date] == undefined) continue;

				cell.count = activitiesRecord[cell.date];
			}
		}

		return calendarGrid;
	}

	public getCalendarGridByYear(year: number): (Activity | null)[][] {
		const firstDayOfYearOffset: number = DateUtilitiesService.getFirstUTCDayOfYearOffset(year);
		const lastDayOfYearOffset: number = DateUtilitiesService.getLastUTCDayOfYearOffset(year);

		const cellHaveValue: boolean[] = [];

		// contains actual box and empty box since start and end of year is not always sundayp
		cellHaveValue.push(...Array(firstDayOfYearOffset).fill(false));
		cellHaveValue.push(...Array(DateUtilitiesService.getDaysInYear(year)).fill(true));
		cellHaveValue.push(...Array(lastDayOfYearOffset).fill(false));

		const calendarGrid: (Activity | null)[][] = Array.from({ length: DateUtilitiesService.daysInWeek }, () => []);
		const dateCursor: Date = DateUtilitiesService.getFirstUTCDayOfYear(year);

		for (let cellIndex = 0; cellIndex < cellHaveValue.length; cellIndex++) {
			const row: number = cellIndex % DateUtilitiesService.daysInWeek;
			const col: number = Math.floor(cellIndex / DateUtilitiesService.daysInWeek);

			let cellValue: Activity | null = null;

			if (cellHaveValue[cellIndex]) {
				cellValue = {
					date: DateUtilitiesService.getDateString(dateCursor, DateStringFormat.YearMonthDay),
					count: 0
				};
			}

			calendarGrid[row][col] = cellValue;

			if (cellHaveValue[cellIndex]) {
				dateCursor.setUTCDate(dateCursor.getUTCDate() + 1);
			}
		}

		return calendarGrid;
	}
}
