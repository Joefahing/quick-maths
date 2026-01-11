import type { Activity } from '../../../assets/types';

abstract class UserActivityService {
	public abstract getUserActivities(start: Date, end: Date): Promise<Activity[]>;
	public abstract getUserAcitivty(date: Date): Promise<Activity>;
	public abstract addUserActivity(date: Date): Promise<Activity>;
}

export default UserActivityService;
