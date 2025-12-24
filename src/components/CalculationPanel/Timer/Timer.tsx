import { type JSX, useEffect, useState } from 'react';

import styles from './Timer.module.css';

export interface TimerProp {
	onTick: (second: number) => void;
}

export function Timer({ onTick }: TimerProp): JSX.Element {
	const [seconds, setSeconds] = useState<number>(0);

	useEffect(() => {
		const interval: number = setInterval(() => {
			setSeconds((prev) => prev + 1);
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		onTick(seconds);
	}, [seconds, onTick]);

	return (
		<div className={styles.timer}>
			<p className={styles.time}>Time: {seconds} Seconds</p>
		</div>
	);
}
