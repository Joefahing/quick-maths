import type { UserActivity } from '../../../assets/types';

abstract class UserActivityService {
	public abstract getUserActivities(start: Date, end: Date): Promise<UserActivity[]>;
	public abstract getUserActivity(date: Date): Promise<UserActivity>;
	public abstract addUserActivity(date: Date): Promise<UserActivity>;
}

export default UserActivityService;
