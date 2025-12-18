import { Navigate } from 'react-router-dom';

import { type JSX, useEffect, useState } from 'react';

import { type Question, type QuestionAnswer } from '../../assets/types';
import paths from '../../routes/routes';
import QuestionService from '../../services/QuestionService';
import { QuestionsContext, type QuestionsContextValue } from '../../shared/context/QuestionContext';

import MainCalculationQuestion from './MainCalculationQuestion/MainCalculationQuestion';
import { ProgressBar } from './ProgressBar/ProgressBar';

import styles from './CalculationPanel.module.css';

export interface CalculationPanelProp {
	answers: QuestionAnswer[];
	questions: Question[];
	onQuestionAnswered: (question: QuestionAnswer) => void;
}

export function CalculationPanel({answers, questions, onQuestionAnswered}: CalculationPanelProp): JSX.Element {
	const [seconds, setSeconds] = useState<number>(0);
	const currentQuestionIndex: number = answers.length;

	//TODO: Move timer to custom hook
	useEffect(() => {
		const interval: number = setInterval(() => {
			setSeconds((prev) => prev + 1);
		}, 1000);

		return () => {
			clearInterval(interval);
			setSeconds(0);
		};
	}, []);

	if (currentQuestionIndex >= questions.length) {
		return <Navigate to={paths.score} replace />;
	}

	const currentQuestion: Question = questions[currentQuestionIndex];

	function handleQuestionEntered(answer: number): void {
		const result: QuestionAnswer = {
			question: currentQuestion,
			isCorrect: QuestionService.getAnswer(currentQuestion.expression) === answer,
			answer: answer,
			time: seconds
		};

		onQuestionAnswered(result);
	}

	const questionsContextValue: QuestionsContextValue = {
		questions: questions,
		currentQuestionIndex: currentQuestionIndex
	};

	return (
		<>
			<div className={styles.panel}>
				<section className={styles.calculation_container}>
					<div className={styles.timer}>
						<p className={styles.time}>Time: {seconds} Seconds</p>
					</div>
					<QuestionsContext.Provider value={questionsContextValue}>
						<MainCalculationQuestion expression={currentQuestion.expression} onAnswerEntered={handleQuestionEntered} />
						<ProgressBar answers={answers} />
					</QuestionsContext.Provider>
				</section>
			</div>
		</>
	);
}
