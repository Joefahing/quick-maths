import { type ActionReducerMapBuilder, createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { UserActivity } from '../assets/types';
import { DateUtilitiesService } from '../shared/services/DateUtilitiesService';
import type {
	UserActivitiesResult,
	UserActivityResult
} from '../shared/services/UserActivityService/UserActivityService';

import type { ThunkServices } from './store';

interface UserActivityState {
	userActivities: UserActivity[];
	streak: number;
	status: 'idle' | 'loading' | 'succeeded' | 'fail';
	error: string | null;
}

const initialUserActivityState: UserActivityState = {
	userActivities: [],
	streak: 0,
	status: 'idle',
	error: null
};

export const fetchUserActivities = createAsyncThunk<
	UserActivitiesResult,
	number,
	{ extra: ThunkServices; rejectValue: string }
>('userActivity/fetchUserActivities', async (year: number, thunkApi) => {
	const startOfYear: Date = DateUtilitiesService.getFirstUTCDayOfYear(year);
	const endOfYear: Date = DateUtilitiesService.getLastUTCDayOfYear(year);

	try {
		return await thunkApi.extra.userActivityService.getUserActivities(startOfYear, endOfYear);
	} catch {
		return thunkApi.rejectWithValue('Failed to fetch user activities');
	}
});

export const addUserActivity = createAsyncThunk<
	UserActivityResult,
	void,
	{ extra: ThunkServices; rejectValue: string }
>('userActivity/addUserActivity', async (_, thunkApi) => {
	try {
		return await thunkApi.extra.userActivityService.addUserActivity(DateUtilitiesService.getUTCToday());
	} catch {
		return thunkApi.rejectWithValue('Failed to add user activity');
	}
});

const userActivitySlice = createSlice({
	name: 'userActivity',
	initialState: initialUserActivityState,
	reducers: {},
	extraReducers: (builder: ActionReducerMapBuilder<UserActivityState>) => {
		builder
			.addCase(fetchUserActivities.pending, (state: UserActivityState) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(
				fetchUserActivities.fulfilled,
				(state: UserActivityState, action: PayloadAction<UserActivitiesResult>) => {
					state.status = 'succeeded';
					state.error = null;
					state.userActivities = action.payload.userActivities;
					state.streak = action.payload.streak;
				}
			)
			.addCase(fetchUserActivities.rejected, (state: UserActivityState, action: PayloadAction<string | undefined>) => {
				state.status = 'fail';
				state.error = action.payload ?? 'Unexpected Error';
			})
			.addCase(addUserActivity.pending, (state: UserActivityState) => {
				state.error = null;
			})
			.addCase(addUserActivity.fulfilled, (state: UserActivityState, action: PayloadAction<UserActivityResult>) => {
				const { userActivity, streak } = action.payload;
				const index: number = state.userActivities.findIndex((a) => a.date === userActivity.date);

				if (index >= 0) state.userActivities[index] = userActivity;
				state.streak = streak;
			})
			.addCase(addUserActivity.rejected, (state: UserActivityState, action: PayloadAction<string | undefined>) => {
				state.status = 'fail';
				state.error = action.payload ?? 'Unexpected Error';
			});
	}
});

export const userActivity = userActivitySlice.reducer;
