import { Navigate } from 'react-router-dom';

import { type JSX, useEffect } from 'react';
import classNames from 'classnames/bind';

import checkIcon from '../../assets/icons/check_icon.svg';
import errorIcon from '../../assets/icons/error_icon.svg';
import type { QuestionAnswer } from '../../assets/types';
import paths from '../../routes/routes';
import useKeydown from '../../shared/hooks/useKeydown';

import styles from './ScorePanel.module.css';

const className = classNames.bind(styles);

export interface ScorePanelProps {
	answers: QuestionAnswer[];
	onAgain: () => void;
	onGameComplete: () => void;
}

export function ScorePanel({ answers, onAgain, onGameComplete }: ScorePanelProps): JSX.Element {
	useEffect(() => {
		if (answers.length === 0) return;

		onGameComplete();
	}, [answers, onGameComplete]);

	useKeydown('Escape', onAgain);

	const correctAnswerCount: number = answers.filter((x) => x.isCorrect).length;
	const successRate: number = correctAnswerCount / answers.length;

	if (answers.length == 0) {
		return <Navigate to={paths.home} />;
	}

	return (
		<div className={styles.score_panel}>
			<h2>Result</h2>
			<ul className={styles.result}>{getResultList(answers)}</ul>
			<div className={styles.sucess_rate}>
				{`${correctAnswerCount}/${answers.length}`}
				<span className={styles.face}>: {getFace(successRate)}</span>
			</div>
			<button onClick={onAgain}>Again</button>
		</div>
	);
}

function getFace(successRate: number): string {
	let face: string = '';

	if (successRate >= 0.7) {
		face = ')';
	} else if (successRate >= 0.4) {
		face = '|';
	} else {
		face = '(';
	}

	return face;
}

function getAnswerString(questionAnswer: QuestionAnswer) {
	return `${questionAnswer.question.expression} = ${questionAnswer.answer}`;
}

function getResultList(answers: QuestionAnswer[]): JSX.Element[] {
	return answers.map((answer: QuestionAnswer, index: number) => {
		const expressionClassName: string = className({
			expression: true,
			incorrect: !answer.isCorrect
		});

		return (
			<li className={styles.answer} key={index}>
				<span>Time: {answer.time}s</span>
				<span className={expressionClassName}>{getAnswerString(answer)}</span>
				{answer.isCorrect ? (
					<img src={checkIcon} width={24} height={24} alt="Correct" />
				) : (
					<img src={errorIcon} width={24} height={24} alt="Incorrect" />
				)}
			</li>
		);
	});
}
