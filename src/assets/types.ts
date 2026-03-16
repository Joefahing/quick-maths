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

export type HeaderLabel = {
	gridStart: number;
	text: string;
};

export interface UserActivity {
	date: string;
	count: number;
}

export enum ActivityLevel {
	None,
	Low,
	Medium,
	High
}

export type CopyStatus = 'idle' | 'success' | 'error';

export interface CopyButtonContent {
	iconSrc: string;
	iconAlt: string;
	buttonText: string;
}

export type EmailTemplateType = 'feature' | 'bug';

export interface EmailTemplateData {
	email: string;
	subject: string;
	bodyRow: string[];
}
