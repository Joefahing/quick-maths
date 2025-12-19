export enum Operation {
	Add = 0x0001,
	Subtract = 0x0002,
	Multiply = 0x0004
}
export interface Question {
	id: string;
	expression: string;
}

export interface QuestionAnswer {
	question: Question;
	answer: number;
	isCorrect: boolean;
	time: number;
}

export type QuestionStatus = 'toBeComplete' | 'inProgress' | 'incorrect' | 'correct';

export interface GameSessionReducer {
	reducer: (state: GameSessionState, action: GameAction) => GameSessionState;
	initialState: GameSessionState;
}
export interface GameSessionState {
	questions: Question[];
	answers: QuestionAnswer[];
}

export type GameAction =
	| { type: 'init'; questions: Question[] }
	| { type: 'reset' }
	| { type: 'answer_added'; answer: QuestionAnswer };
