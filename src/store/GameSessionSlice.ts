import { type ActionReducerMapBuilder, createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Operation, Question, QuestionAnswer } from '../assets/types';
import type RetrieveQuestionService from '../shared/services/RetrieveQuestionService';

import type { RootState, ThunkServices } from './store';

type GameSessionStatus = 'idle' | 'loading' | 'succeeded' | 'fail';

export interface GameSessionState {
	questions: Question[];
	answers: QuestionAnswer[];
	status: GameSessionStatus;
	error: string | null;
}

const initialGameSessionState: GameSessionState = {
	questions: [],
	answers: [],
	status: 'idle',
	error: null
};

export const startGameSession = createAsyncThunk<
	Question[],
	void,
	{ state: RootState; extra: ThunkServices; rejectValue: string }
>('gameSession/startGameSession', async (_, thunkApi) => {
	const questionService: RetrieveQuestionService = thunkApi.extra.questionService;

	const state: RootState = thunkApi.getState();
	const selectedOperations: Operation = state.gameSetting.selectedOperations;

	try {
		const questions: Question[] | null = await questionService.getQuestion(selectedOperations);

		if (!questions || questions.length === 0) {
			return thunkApi.rejectWithValue('Could not load questions');
		}

		return questions;
	} catch {
		return thunkApi.rejectWithValue('Failed to fetch questions');
	}
});

const gameSessionSlice = createSlice({
	name: 'gameSession',
	initialState: initialGameSessionState,
	reducers: {
		resetGameSession(state: GameSessionState) {
			state.answers = [];
			state.questions = [];
		},
		questionAnswered(state: GameSessionState, action: PayloadAction<QuestionAnswer>) {
			state.answers = [...state.answers, action.payload];
		}
	},
	extraReducers: (builder: ActionReducerMapBuilder<GameSessionState>) => {
		builder
			.addCase(startGameSession.pending, (state: GameSessionState) => {
				state.error = null;
				state.status = 'loading';
			})
			.addCase(startGameSession.fulfilled, (state: GameSessionState, action: PayloadAction<Question[]>) => {
				state.status = 'idle';
				state.error = null;
				state.questions = action.payload;
				state.answers = [];
			})
			.addCase(startGameSession.rejected, (state: GameSessionState, action: PayloadAction<string | undefined>) => {
				state.status = 'fail';
				state.error = action.payload ?? 'Unexpected Error';
			});
	}
});

export const gameSession = gameSessionSlice.reducer;
export const { questionAnswered, resetGameSession } = gameSessionSlice.actions;
