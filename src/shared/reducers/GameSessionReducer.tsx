import type { GameAction, GameSessionReducer, GameSessionState } from '../../assets/types';

const initialGameState: GameSessionState = {
	answers: [],
	questions: []
};

function gameSessionReducerFunction(state: GameSessionState, action: GameAction): GameSessionState {
	switch (action.type) {
		case 'init': {
			return { questions: action.questions, answers: [] };
		}
		case 'reset': {
			return { questions: [], answers: [] };
		}
		case 'answer_added': {
			return { ...state, answers: [...state.answers, action.answer] };
		}
		default: {
			return state;
		}
	}
}

export const gameSessionReducer: GameSessionReducer = {
	initialState: initialGameState,
	reducer: gameSessionReducerFunction
};
