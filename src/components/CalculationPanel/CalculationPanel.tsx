import { Navigate } from 'react-router-dom';

import { type JSX, useEffect, useState } from 'react';

import { type Operation, type Question, type QuestionAnswer } from '../../assets/types';
import paths from '../../routes/routes';
import QuestionService from '../../services/QuestionService';

import MainCalculationQuestion from './MainCalculationQuestion/MainCalculationQuestion';

import styles from './CalculationPanel.module.css';

export interface CalculationPanelProp {
	questions: Question[];
	answers: QuestionAnswer[];
	currentIndex: number;
	selectedOperations: Operation;
	onQuestionAnswered: (question: QuestionAnswer) => void;
}

export function CalculationPanel(prop: CalculationPanelProp): JSX.Element {
	const [seconds, setSeconds] = useState<number>(0);
	const { questions, answers, currentIndex, onQuestionAnswered } = prop;
	const currentQuestion: Question = questions[currentIndex];

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

	function handleQuestionEntered(answer: number): void {
		const result: QuestionAnswer = {
			question: currentQuestion,
			isCorrect: QuestionService.getAnswer(currentQuestion.expression) === answer,
			answer: answer,
			time: seconds
		};

		onQuestionAnswered(result);
	}

	if (questions.length == 0) {
		return <Navigate to={paths.home} />;
	}

	return (
		<>
			<div className={styles.panel}>
				<section className={styles.calculation_container}>
					<div className={styles.timer}>
						<p className={styles.time}>Time: {seconds} Seconds</p>
					</div>
					<MainCalculationQuestion expression={currentQuestion.expression} onAnswerEntered={handleQuestionEntered} />
					<div className={styles.progress_bar}>
						{questions.map((_, index) => {
							const isLast: boolean = index === questions.length - 1;
              
							return (
								<div key={`question-${index}`} className={styles.question_container}>
									<div className={styles.question}>{index + 1}</div>
									{!isLast && <div className={styles.connector}></div>}
								</div>
							);
						})}
					</div>
				</section>
			</div>
		</>
	);
}
