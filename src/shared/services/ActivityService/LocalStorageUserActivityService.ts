import type { Activity } from '../../../assets/types';
import LocalStorageService from '../../../services/LocalStorageService';
import { DateStringFormat, DateUtilitiesService } from '../DateUtilitiesService';

import UserActivityService from './UserActivityService';

class LocalStorageUserActivityService extends UserActivityService {
	constructor() {
		super();
	}
	public getUserActivities(start: Date, end: Date): Promise<Activity[]> {
		const dateCursor: Date = new Date(start.getTime());
		const activities: Activity[] = [];

		while (dateCursor.getTime() <= end.getTime()) {
			const dateKey: string = DateUtilitiesService.getDateString(dateCursor, DateStringFormat.YearMonthDay);
			const count: number = LocalStorageService.getItem<number>(dateKey) ?? 0;

			activities.push({
				date: dateKey,
				count: count
			});

			dateCursor.setUTCDate(dateCursor.getUTCDate() + 1);
		}

		return Promise.resolve(activities);
	}
	public getUserAcitivty(date: Date): Promise<Activity> {
		const dateKey: string = DateUtilitiesService.getDateString(date, DateStringFormat.YearMonthDay);
		const count: number = LocalStorageService.getItem<number>(dateKey) ?? 0;

		return Promise.resolve({
			date: dateKey,
			count: count
		});
	}

	public async addUserActivity(date: Date): Promise<Activity> {
		const activity: Activity = await this.getUserAcitivty(date);
		const newCount: number = activity.count + 1;

		if (LocalStorageService.setItem<number>(activity.date, newCount) != undefined) {
			return { date: activity.date, count: newCount };
		} else {
			throw new Error('Add user activity fail');
		}
	}
}

export default LocalStorageUserActivityService;
