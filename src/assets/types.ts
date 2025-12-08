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
