import type { HeaderLabel, UserActivity } from '../../../assets/types';
import { DateUtilitiesService } from '../../../shared/services/DateUtilitiesService';

export class ActivityHeatmapService {
	public static getUserActivityCountByDate(userActivities: UserActivity[]): Record<string, number> {
		const userActivityCountByDate: Record<string, number> = {};

		for (const userActivity of userActivities) {
			userActivityCountByDate[userActivity.date] = userActivity.count;
		}

		return userActivityCountByDate;
	}

	public static getStreakFromActivities(userActivities: UserActivity[]): number {
		const userActivityCountByDate: Record<string, number> = this.getUserActivityCountByDate(userActivities);
		const dateCursor: Date = DateUtilitiesService.getUTCToday();
		let streak: number = 0;
		let dateCursorString: string = DateUtilitiesService.getKeyByDate(dateCursor);

		while (userActivityCountByDate[dateCursorString] != undefined && userActivityCountByDate[dateCursorString] > 0) {
			streak++;
			dateCursor.setUTCDate(dateCursor.getUTCDate() - 1);
			dateCursorString = DateUtilitiesService.getKeyByDate(dateCursor);
		}

		return streak;
	}

	public static getMonthLabels(calendarGrid: (UserActivity | null)[][]): HeaderLabel[] {
		if (calendarGrid[0].length === 0) {
			//TODO: implement error page
			throw new Error('Calendar grid cannot be empty');
		}

		const sundays: (UserActivity | null)[] = calendarGrid[0];
		const headerLabels: HeaderLabel[] = [];
		let pastSunday: Date | null = null;

		for (let i = 0; i < sundays.length; i++) {
			const currentSundayActivity: UserActivity | null = sundays[i];
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

	public static buildCalendarGrid(year: number, userActivities: UserActivity[]): (UserActivity | null)[][] {
		const calendarGrid: (UserActivity | null)[][] = this.getCalendarGridByYear(year);
		const userActivityCountByDate: Record<string, number> = this.getUserActivityCountByDate(userActivities);

		for (const row of calendarGrid) {
			for (let col = 0; col < row.length; col++) {
				const cell: UserActivity | null = row[col];
				if (cell == null || userActivityCountByDate[cell.date] == undefined) continue;

				cell.count = userActivityCountByDate[cell.date];
			}
		}

		return calendarGrid;
	}

	public static getCalendarGridByYear(year: number): (UserActivity | null)[][] {
		const firstDayOfYearOffset: number = DateUtilitiesService.getFirstUTCDayOfYearOffset(year);
		const lastDayOfYearOffset: number = DateUtilitiesService.getLastUTCDayOfYearOffset(year);

		const cellHaveValue: boolean[] = [];

		// contains actual box and empty box since start and end of year is not always sundayp
		cellHaveValue.push(...Array(firstDayOfYearOffset).fill(false));
		cellHaveValue.push(...Array(DateUtilitiesService.getDaysInYear(year)).fill(true));
		cellHaveValue.push(...Array(lastDayOfYearOffset).fill(false));

		const calendarGrid: (UserActivity | null)[][] = Array.from({ length: DateUtilitiesService.daysInWeek }, () => []);
		const dateCursor: Date = DateUtilitiesService.getFirstUTCDayOfYear(year);

		for (let cellIndex = 0; cellIndex < cellHaveValue.length; cellIndex++) {
			const row: number = cellIndex % DateUtilitiesService.daysInWeek;
			const col: number = Math.floor(cellIndex / DateUtilitiesService.daysInWeek);

			let cellValue: UserActivity | null = null;

			if (cellHaveValue[cellIndex]) {
				cellValue = {
					date: DateUtilitiesService.getKeyByDate(dateCursor),
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
