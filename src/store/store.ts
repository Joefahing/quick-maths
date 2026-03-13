import { configureStore } from '@reduxjs/toolkit';

import GeneratedQuestionService from '../shared/services/GeneratedQuestionService';
import type RetrieveQuestionService from '../shared/services/RetrieveQuestionService';

import { gameSession } from './GameSessionSlice';
import { gameSetting } from './GameSettingSlice';

export interface ThunkServices {
	questionService: RetrieveQuestionService;
}

const services: ThunkServices = {
	questionService: new GeneratedQuestionService()
};

export const store = configureStore({
	reducer: {
		gameSetting,
		gameSession
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			thunk: {
				extraArgument: services
			}
		});
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
