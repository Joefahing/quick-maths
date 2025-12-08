import { Navigate } from 'react-router-dom';

import { type JSX } from 'react';
import classNames from 'classnames/bind';

import checkIcon from '../../assets/icons/check_icon.svg';
import errorIcon from '../../assets/icons/error_icon.svg';
import type { QuestionAnswer } from '../../assets/types';
import paths from '../../routes/routes';
import useKeydown from '../../shared/hooks/useKeydown';

import styles from './Scores.module.css';

const className = classNames.bind(styles);
export function Score(props: { answers: QuestionAnswer[]; onAgain: () => void }): JSX.Element {
	const { answers, onAgain } = props;

	function getAnswerString(questionAnswer: QuestionAnswer) {
		return `${questionAnswer.question.expression} = ${questionAnswer.answer}`;
	}

	function getResultList(): JSX.Element[] {
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

	useKeydown('Escape', onAgain);

	const correctAnswerCount: number = answers.filter((x) => x.isCorrect).length;
	const successRate: number = correctAnswerCount / answers.length;
	let face: string = '';

	if (successRate >= 0.7) {
		face = ')';
	} else if (successRate >= 0.4) {
		face = '|';
	} else {
		face = '(';
	}

	if (answers.length == 0) {
		return <Navigate to={paths.home} />;
	}

	return (
		<>
			<div className={styles.score_panel}>
				<h2>Result</h2>
				<ul className={styles.result}>{getResultList()}</ul>
				<div className={styles.sucess_rate}>
					{`${correctAnswerCount}/${answers.length}`}
					<span className={styles.face}>: {face}</span>
				</div>
				<button onClick={onAgain}>Again</button>
			</div>
		</>
	);
}
