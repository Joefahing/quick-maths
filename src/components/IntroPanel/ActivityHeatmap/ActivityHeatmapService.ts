import type { HeaderLabel } from '../../../assets/types';
import { DateUtilityService } from '../../../shared/services/DateService';

export class ActivityHeatMapService {
	public getMonthLabels(calendarGrid: (Date | null)[][]): HeaderLabel[] {
		if (calendarGrid[0].length === 0) {
			//TODO: implement error page
			throw new Error('Calendar grid cannot be empty');
		}

		const sundays: (Date | null)[] = calendarGrid[0];
		const headerLabels: HeaderLabel[] = [];
		let pastSunday: Date | null = null;

		for (let i = 0; i < sundays.length; i++) {
			const currentSunday: Date | null = sundays[i];

			if (
				currentSunday == null ||
				(currentSunday != null && pastSunday != null && currentSunday.getUTCMonth() === pastSunday.getUTCMonth())
			) {
				continue;
			}

			headerLabels.push({
				text: DateUtilityService.getMonthAbbreviationByDate(currentSunday),
				gridStart: i + 1
			});

			pastSunday = currentSunday;
		}

		return headerLabels;
	}

	public getCalendarGridByYear(year: number): (Date | null)[][] {
		const firstDayOfYearOffset: number = DateUtilityService.getFirstUTCDayOfYearOffset(year);
		const lastDayOfYearOffset: number = DateUtilityService.getLastUTCDayOfYearOffset(year);

		const cellHaveValue: boolean[] = [];

		// contains actual box and empty box since start and end of year is not always sundayp
		cellHaveValue.push(...Array(firstDayOfYearOffset).fill(false));
		cellHaveValue.push(...Array(DateUtilityService.getDaysInYear(year)).fill(true));
		cellHaveValue.push(...Array(lastDayOfYearOffset).fill(false));

		const calendarGrid: (Date | null)[][] = Array.from({ length: DateUtilityService.daysInWeek }, () => []);
		const dateCursor: Date = DateUtilityService.getFirstUTCDayOfYear(year);

		for (let cellIndex = 0; cellIndex < cellHaveValue.length; cellIndex++) {
			const row: number = cellIndex % DateUtilityService.daysInWeek;
			const col: number = Math.floor(cellIndex / DateUtilityService.daysInWeek);

			calendarGrid[row][col] = cellHaveValue[cellIndex] ? new Date(dateCursor) : null;

			if (cellHaveValue[cellIndex]) {
				dateCursor.setUTCDate(dateCursor.getUTCDate() + 1);
			}
		}

		return calendarGrid;
	}
}
