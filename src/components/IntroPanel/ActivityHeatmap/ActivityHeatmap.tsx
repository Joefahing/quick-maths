import { type JSX, useMemo } from 'react';

import type { UserActivity } from '../../../assets/types';
import { DateStringFormat } from '../../../shared/services/DateUtilitiesService';

import { ActivityHeatmapDayHeader } from './ActivityHeatmapDayHeader/ActivityHeatmapDayHeader';
import { ActivityHeatmapGrid } from './ActivityHeatmapGrid/ActivityHeatmapGrid';
import { ActivityHeatmapMonthHeader } from './ActivityHeatmapMonthHeader/ActivityHeatmapMonthHeader';
import { ActivityHeatmapService } from './ActivityHeatmapService';

import classes from './ActivityHeatmap.module.css';

export interface ActivityHeatmapProps {
	year: number;
	userActivities: UserActivity[];
}

export function ActivityHeatmap({ year, userActivities }: ActivityHeatmapProps): JSX.Element {
	const calendarGrid: (UserActivity | null)[][] = useMemo(
		() => ActivityHeatmapService.buildCalendarGrid(year, userActivities),
		[year, userActivities]
	);

	const streak: number = useMemo(() => {
		return ActivityHeatmapService.getStreakFromActivities(userActivities, DateStringFormat.YearMonthDay);
	}, [userActivities]);

	return (
		<div className={classes.heatmap_container}>
			<div className={classes.heatmap_header}>
				<div className={classes.streak_text}>
					Current Streak: <span>{streak} Days</span>
				</div>
			</div>
			<div className={classes.heatmap_wrapper}>
				<div className={classes.heatmap_content}>
					<ActivityHeatmapMonthHeader calendarGrid={calendarGrid} />
					<ActivityHeatmapGrid calendarGrid={calendarGrid} />
					<ActivityHeatmapDayHeader />
				</div>
			</div>
		</div>
	);
}
