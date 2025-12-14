import type { JSX } from 'react';

import type { Question, QuestionAnswer, QuestionStatus } from '../../../assets/types';
import { QuestionIndicator, type QuestionIndicatorProps } from '../QuestionIndicator/QuestionIndicator';

import styles from './ProgressBar.module.css';

export interface ProgressBarProps {
	questions: Question[];
	answers: QuestionAnswer[];
	currentQuestionIndex: number;
}

export function ProgressBar({ questions, answers, currentQuestionIndex }: ProgressBarProps): JSX.Element {
	const questionIndicators: JSX.Element[] = questions.map((_: Question, index: number) => {
		const indicatorProp: QuestionIndicatorProps = {
			index,
			isLast: questions.length - 1 === index,
			questionStatus: getQuestionStatus(answers, index, currentQuestionIndex)
		};

		return <QuestionIndicator key={`question_${index}`} {...indicatorProp} />;
	});

	return <div className={styles.progress_bar}>{questionIndicators}</div>;
}

function getQuestionStatus(
	answers: QuestionAnswer[],
	questionIndex: number,
	currentQuestionIndex: number
): QuestionStatus {
	if (questionIndex === currentQuestionIndex) {
		return 'inProgress';
	} else if (answers[questionIndex] == undefined) {
		return 'toBeComplete';
	} else {
		return answers[questionIndex].isCorrect ? 'correct' : 'incorrect';
	}
}
