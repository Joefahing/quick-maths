import { useCallback, useEffect, useState } from 'react';

import type { UserActivity } from '../../assets/types';
import type UserActivityService from '../services/ActivityService/UserActivityService';
import { DateUtilitiesService } from '../services/DateUtilitiesService';

export interface UseUserActivitiesResult {
	userActivities: UserActivity[];
	userActivitiesError: Error | null;
	addUserActivity: () => Promise<void>;
}

export function useUserActivities(year: number, userActivityService: UserActivityService): UseUserActivitiesResult {
	const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
	const [userActivitiesError, setUserActivitiesError] = useState<Error | null>(null);

	const fetchUserActivities = useCallback(
		async (year: number): Promise<void> => {
			const startofYear: Date = DateUtilitiesService.getFirstUTCDayOfYear(year);
			const endofYear: Date = DateUtilitiesService.getLastUTCDayOfYear(year);

			setUserActivitiesError(null);

			try {
				const fetchedUserActivities: UserActivity[] = await userActivityService.getUserActivities(
					startofYear,
					endofYear
				);
				setUserActivities(fetchedUserActivities);
			} catch (error: unknown) {
				if (error instanceof Error) setUserActivitiesError(error);
				else setUserActivitiesError(new Error(String(error)));
			}
		},
		[userActivityService]
	);

	const addUserActivity = useCallback(async () => {
		setUserActivitiesError(null);
		try {
			const updatedUserActivity: UserActivity = await userActivityService.addUserActivity(
				DateUtilitiesService.getUTCToday()
			);
			setUserActivities((previousUserActivities) => {
				const currentUserActivityIndex: number = previousUserActivities.findIndex(
					(a) => a.date === updatedUserActivity.date
				);

				if (currentUserActivityIndex >= 0) {
					const nextUserActivities: UserActivity[] = [...previousUserActivities];
					nextUserActivities[currentUserActivityIndex] = updatedUserActivity;
					return nextUserActivities;
				} else {
					return previousUserActivities;
				}
			});
		} catch (error: unknown) {
			if (error instanceof Error) setUserActivitiesError(error);
			else setUserActivitiesError(new Error(String(error)));
		}
	}, [userActivityService]);

	useEffect(() => {
		fetchUserActivities(year);
	}, [year, fetchUserActivities]);

	return { userActivities, userActivitiesError, addUserActivity };
}
