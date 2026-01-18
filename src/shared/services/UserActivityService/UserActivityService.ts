import type { UserActivity } from '../../../assets/types';

export interface UserActivitiesResult {
	userActivities: UserActivity[];
	streak: number;
}

export interface UserActivityResult {
	userActivity: UserActivity;
	streak: number;
}

abstract class UserActivityService {
	public abstract getUserActivities(start: Date, end: Date): Promise<UserActivitiesResult>;
	public abstract getUserActivity(date: Date): Promise<UserActivity>;
	public abstract addUserActivity(date: Date): Promise<UserActivityResult>;
}

export default UserActivityService;
