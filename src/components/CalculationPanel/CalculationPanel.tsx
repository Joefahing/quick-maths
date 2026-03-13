import { Navigate } from 'react-router-dom';

import { type JSX, useCallback, useRef } from 'react';

import { type Question, type QuestionAnswer } from '../../assets/types';
import paths from '../../routes/routes';
import { QuestionsContext, type QuestionsContextValue } from '../../shared/context/QuestionContext';
import QuestionService from '../../shared/services/QuestionService';
import { questionAnswered } from '../../store/GameSessionSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import MainCalculationQuestion from './MainCalculationQuestion/MainCalculationQuestion';
import { ProgressBar } from './ProgressBar/ProgressBar';
import { Timer } from './Timer/Timer';

import styles from './CalculationPanel.module.css';

export function CalculationPanel(): JSX.Element {
	const { questions, answers } = useAppSelector((state) => state.gameSession);
	const dispatcher = useAppDispatch();

	const secondsRef = useRef(0);
	const handleTimerTicked = useCallback((nextSecond: number) => {
		secondsRef.current = nextSecond;
	}, []);

	const currentQuestionIndex: number = answers.length;

	if (currentQuestionIndex >= questions.length) {
		return <Navigate to={paths.score} replace />;
	}

	const currentQuestion: Question = questions[currentQuestionIndex];

	function handleQuestionEntered(answer: number): void {
		const result: QuestionAnswer = {
			question: currentQuestion,
			isCorrect: QuestionService.getAnswer(currentQuestion.expression) === answer,
			answer: answer,
			time: secondsRef.current
		};

		dispatcher(questionAnswered(result));
	}

	const questionsContextValue: QuestionsContextValue = {
		questions: questions,
		currentQuestionIndex: currentQuestionIndex
	};

	return (
		<div className={styles.panel}>
			<section className={styles.calculation_container}>
				<Timer onTick={handleTimerTicked} />
				<QuestionsContext.Provider value={questionsContextValue}>
					<MainCalculationQuestion expression={currentQuestion.expression} onAnswerEntered={handleQuestionEntered} />
					<ProgressBar answers={answers} />
				</QuestionsContext.Provider>
			</section>
		</div>
	);
}
