export enum MonthIndex {
	Jan = 0,
	Feb = 1,
	Mar = 2,
	Apr = 3,
	May = 4,
	Jun = 5,
	Jul = 6,
	Aug = 7,
	Sep = 8,
	Oct = 9,
	Nov = 10,
	Dec = 11
}

export enum DayIndex {
	Sun = 0,
	Mon = 1,
	Tue = 2,
	Wed = 3,
	Thu = 4,
	Fri = 5,
	Sat = 6
}

export enum DateStringFormat {
	YearMonthDay,
	MonthDayYear,
	MonthDay
}

export class DateUtilitiesService {
	public static readonly daysInWeek: number = 7;
	private static readonly shortMonthFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('en-US', {
		month: 'short',
		timeZone: 'UTC'
	});
	private static readonly yearMonthDayFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('en-CA', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		timeZone: 'UTC'
	});
	private static readonly monthDayYearFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		timeZone: 'UTC'
	});
	private static readonly montDayFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		timeZone: 'UTC'
	});

	public static getUTCToday(): Date {
		return new Date(Date.now());
	}

	public static getCurrentUTCYear(): number {
		const today: Date = new Date();
		return today.getUTCFullYear();
	}

	public static getFirstUTCDayOfYear(year: number): Date {
		return new Date(Date.UTC(year, MonthIndex.Jan, 1));
	}

	public static getFirstUTCDayOfYearOffset(year: number): number {
		return this.getFirstUTCDayOfYear(year).getUTCDay();
	}

	public static getLastUTCDayOfYear(year: number): Date {
		return new Date(Date.UTC(year, MonthIndex.Dec, 31));
	}

	public static getLastUTCDayOfYearOffset(year: number): number {
		const lastDay: Date = new Date(Date.UTC(year, MonthIndex.Dec, 31));
		return this.daysInWeek - (lastDay.getUTCDay() + 1);
	}

	public static getMonthAbbreviationByDate(date: Date): string {
		return this.shortMonthFormatter.format(date);
	}

	public static getDaysInYear(year: number): number {
		const startOfYear: number = Date.UTC(year, 0, 1);
		const endOfYear: number = Date.UTC(year + 1, 0, 1);

		return Math.round((endOfYear - startOfYear) / (24 * 60 * 60 * 1000));
	}

	public static getDateString(date: Date, format: DateStringFormat): string {
		if (format === DateStringFormat.YearMonthDay) {
			return this.yearMonthDayFormatter.format(date);
		} else if (format === DateStringFormat.MonthDay) {
			return this.montDayFormatter.format(date);
		}
		return this.monthDayYearFormatter.format(date);
	}

	public static getKeyByDate(date: Date) {
		return this.getDateString(date, DateStringFormat.YearMonthDay);
	}

	public static isValidDate(date: Date): boolean {
		return !Number.isNaN(date.getTime());
	}
}
