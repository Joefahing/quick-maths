import ClassName from 'classnames/bind';
import type { JSX } from 'react';

import correctIcon from '../../../assets/icons/check_icon.svg';
import incorrectIcon from '../../../assets/icons/error_icon.svg';
import type { QuestionStatus } from '../../../assets/types';

import styles from './QuestionIndicator.module.css';

const cn = ClassName.bind(styles);

export interface QuestionIndicatorProps {
	index: number;
	isLast: boolean;
	questionStatus: QuestionStatus;
}

export function QuestionIndicator({ index, isLast, questionStatus }: QuestionIndicatorProps): JSX.Element {
	let indicatorContent: JSX.Element;

	if (questionStatus === 'inProgress' || questionStatus === 'toBeComplete') {
		indicatorContent = <span>{index}</span>;
	} else if (questionStatus === 'correct') {
		indicatorContent = <img src={correctIcon} width={24} height={24} alt="Correct Question" />;
	} else {
		indicatorContent = <img src={incorrectIcon} width={24} height={24} alt="Incorrect Questione" />;
	}

	const questionClassName = cn({
		question: true,
		in_progress: questionStatus === 'inProgress'
	});

	return (
		<div className={styles.question_container}>
			<div className={questionClassName}>{indicatorContent}</div>
			{!isLast && <div className={styles.connector}></div>}
		</div>
	);
}
