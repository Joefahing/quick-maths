import type { UserActivity } from '../../../assets/types';
import { DateUtilitiesService } from '../DateUtilitiesService';
import LocalStorageService from '../LocalStorageService';

import UserActivityService from './UserActivityService';

class LocalStorageUserActivityService extends UserActivityService {
	constructor() {
		super();
	}

	public getUserActivities(start: Date, end: Date): Promise<UserActivity[]> {
		const dateCursor: Date = new Date(start.getTime());
		const userActivities: UserActivity[] = [];

		while (dateCursor.getTime() <= end.getTime()) {
			const dateKey: string = DateUtilitiesService.getKeyByDate(dateCursor);
			const count: number = LocalStorageService.getItem<number>(dateKey) ?? 0;

			userActivities.push({
				date: dateKey,
				count: count
			});

			dateCursor.setUTCDate(dateCursor.getUTCDate() + 1);
		}

		return Promise.resolve(userActivities);
	}

	public getUserActivity(date: Date): Promise<UserActivity> {
		const dateKey: string = DateUtilitiesService.getKeyByDate(date);
		const count: number = LocalStorageService.getItem<number>(dateKey) ?? 0;

		return Promise.resolve({
			date: dateKey,
			count: count
		});
	}

	public async addUserActivity(date: Date): Promise<UserActivity> {
		const userActivity: UserActivity = await this.getUserActivity(date);
		const newCount: number = userActivity.count + 1;

		if (LocalStorageService.setItem<number>(userActivity.date, newCount) != undefined) {
			return { date: userActivity.date, count: newCount };
		} else {
			throw new Error('Add user activity fail');
		}
	}
}

export default LocalStorageUserActivityService;
