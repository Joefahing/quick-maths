import { configureStore, createListenerMiddleware, type TypedStartListening } from '@reduxjs/toolkit';

import GeneratedQuestionService from '../shared/services/GeneratedQuestionService';
import type RetrieveQuestionService from '../shared/services/RetrieveQuestionService';
import LocalStorageUserActivityService from '../shared/services/UserActivityService/LocalStorageUserActivityService';
import type UserActivityService from '../shared/services/UserActivityService/UserActivityService';

import { gameSession } from './GameSessionSlice';
import { gameSetting } from './GameSettingSlice';
import { userActivity } from './UserActivitySlice';

const services: ThunkServices = {
	questionService: new GeneratedQuestionService(),
	userActivityService: new LocalStorageUserActivityService()
};

export const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
	reducer: {
		gameSetting,
		gameSession,
		userActivity
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			thunk: {
				extraArgument: services
			}
		}).prepend(listenerMiddleware.middleware);
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export interface ThunkServices {
	questionService: RetrieveQuestionService;
	userActivityService: UserActivityService;
}
