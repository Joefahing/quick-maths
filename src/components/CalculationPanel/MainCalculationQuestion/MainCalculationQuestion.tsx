import { type JSX, useEffect, useRef, useState } from 'react';

import styles from './MainCalculationQuestion.module.css';

function MainCalculationQuestion(prop: { expression: string; onAnswerEntered: (answer: number) => void }): JSX.Element {
	const [inputValue, setInputValue] = useState<string>('');
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { expression, onAnswerEntered } = prop;

	const submitAnswer = (answer: string): void => {
		if (answer === '') return;

		const value = Number(answer);

		if (Number.isNaN(value)) return;

		onAnswerEntered(value);
		setInputValue('');
	};

	const handleSubmitAnswerByKey = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.key !== 'Enter') return;

		const answer = event.currentTarget.value.trim();
		submitAnswer(answer);
	};

	const handleSubmitAnswerByButton = (): void => {
		const answer: string = inputRef.current?.value.trim() ?? '';
		submitAnswer(answer);
	};

	useEffect(() => inputRef.current?.focus(), [expression]);

	return (
		<>
			<div className={styles.question}>
				<div className={styles.expression}>{expression}</div>
				<input
					className={styles.answer_input}
					type="text"
					pattern="[0-9]*"
					inputMode="text"
					maxLength={8}
					ref={inputRef}
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handleSubmitAnswerByKey}
				/>
				<button className={styles.submit_button} onClick={handleSubmitAnswerByButton} type="button">
					Submit
				</button>
				<div>Press enter or use button to submit</div>
			</div>
		</>
	);
}

export default MainCalculationQuestion;
