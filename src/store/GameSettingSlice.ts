import { createSlice, type PayloadAction, type Reducer } from '@reduxjs/toolkit';

import { Operation } from '../assets/types';

export interface GameSettingState {
	selectedOperations: Operation;
}

const initialState: GameSettingState = {
	selectedOperations: Operation.Add
};

const gameSettingSlice = createSlice({
	name: 'gameSettings',
	initialState,
	reducers: {
		toggleOperations(state: GameSettingState, action: PayloadAction<Operation>) {
			const operations: Operation = action.payload;
			const previousOperations: Operation = state.selectedOperations;
			const nextOperations: Operation =
				previousOperations & operations ? previousOperations & ~operations : previousOperations | operations;

			if (nextOperations) {
				state.selectedOperations = nextOperations;
			}
		}
	}
});

export const gameSetting: Reducer<GameSettingState> = gameSettingSlice.reducer;
export const { toggleOperations } = gameSettingSlice.actions;
