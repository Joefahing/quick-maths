import { type Context, createContext } from 'react';

import type { Question } from '../../assets/types';

export interface QuestionsContextValue {
	questions: Question[];
	currentQuestionIndex: number;
}

export const QuestionsContext: Context<QuestionsContextValue> = createContext<QuestionsContextValue>({
	questions: [],
	currentQuestionIndex: 0
});
