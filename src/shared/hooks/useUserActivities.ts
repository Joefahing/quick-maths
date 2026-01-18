import { useCallback, useEffect, useState } from 'react';

import type { UserActivity } from '../../assets/types';
import { DateUtilitiesService } from '../services/DateUtilitiesService';
import type UserActivityService from '../services/UserActivityService/UserActivityService';
import type { UserActivitiesResult, UserActivityResult } from '../services/UserActivityService/UserActivityService';

export interface UseUserActivitiesResult {
	userActivities: UserActivity[];
	streak: number;
	userActivitiesError: Error | null;
	addUserActivity: () => Promise<void>;
}

export function useUserActivities(year: number, userActivityService: UserActivityService): UseUserActivitiesResult {
	const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
	const [streak, setStreak] = useState<number>(0);
	const [userActivitiesError, setUserActivitiesError] = useState<Error | null>(null);

	const fetchUserActivities = useCallback(
		async (year: number): Promise<void> => {
			const startofYear: Date = DateUtilitiesService.getFirstUTCDayOfYear(year);
			const endofYear: Date = DateUtilitiesService.getLastUTCDayOfYear(year);

			setUserActivitiesError(null);

			try {
				const fetchedUserActivities: UserActivitiesResult = await userActivityService.getUserActivities(
					startofYear,
					endofYear
				);

				setUserActivities(fetchedUserActivities.userActivities);
				setStreak(fetchedUserActivities.streak);
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
			const updatedUserActivityResult: UserActivityResult = await userActivityService.addUserActivity(
				DateUtilitiesService.getUTCToday()
			);
			const { userActivity, streak } = updatedUserActivityResult;

			setUserActivities((previousUserActivities) => {
				const currentUserActivityIndex: number = previousUserActivities.findIndex((a) => a.date === userActivity.date);

				if (currentUserActivityIndex >= 0) {
					const nextUserActivities: UserActivity[] = [...previousUserActivities];
					nextUserActivities[currentUserActivityIndex] = userActivity;

					return nextUserActivities;
				} else {
					return previousUserActivities;
				}
			});

			setStreak(streak);
		} catch (error: unknown) {
			if (error instanceof Error) setUserActivitiesError(error);
			else setUserActivitiesError(new Error(String(error)));
		}
	}, [userActivityService]);

	useEffect(() => {
		fetchUserActivities(year);
	}, [year, fetchUserActivities]);

	return { userActivities, streak, userActivitiesError, addUserActivity };
}
