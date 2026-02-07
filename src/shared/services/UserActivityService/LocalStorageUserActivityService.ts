import type { UserActivity } from '../../../assets/types';
import { DateUtilitiesService } from '../DateUtilitiesService';
import LocalStorageService from '../LocalStorageService';

import UserActivityService, { type UserActivitiesResult, type UserActivityResult } from './UserActivityService';

class LocalStorageUserActivityService extends UserActivityService {
	constructor() {
		super();
	}

	public getUserActivities(start: Date, end: Date): Promise<UserActivitiesResult> {
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

		const userActivitiesResult: UserActivitiesResult = {
			userActivities: userActivities,
			streak: this.getStreakCount()
		};

		return Promise.resolve(userActivitiesResult);
	}

	public getUserActivity(date: Date): Promise<UserActivity> {
		const dateKey: string = DateUtilitiesService.getKeyByDate(date);
		const count: number = LocalStorageService.getItem<number>(dateKey) ?? 0;

		return Promise.resolve({
			date: dateKey,
			count: count
		});
	}

	public async addUserActivity(date: Date): Promise<UserActivityResult> {
		const userActivity: UserActivity = await this.getUserActivity(date);
		const newCount: number = userActivity.count + 1;

		if (LocalStorageService.setItem<number>(userActivity.date, newCount) != undefined) {
			const newUserActivity: UserActivity = { date: userActivity.date, count: newCount };
			const userActivityResult: UserActivityResult = {
				userActivity: newUserActivity,
				streak: this.getStreakCount()
			};

			return userActivityResult;
		} else {
			throw new Error('Add user activity fail');
		}
	}

	private getStreakCount(): number {
		let streak = 0;
		const dateCursor = DateUtilitiesService.getUTCToday();

		while ((LocalStorageService.getItem<number>(DateUtilitiesService.getKeyByDate(dateCursor)) ?? 0) > 0) {
			streak++;
			dateCursor.setUTCDate(dateCursor.getUTCDate() - 1);
		}

		return streak;
	}
}

export default LocalStorageUserActivityService;
