import { type JSX } from 'react';

import addIcon from '../../assets/icons/add_icon.svg';
import multiplyIcon from '../../assets/icons/multiplication_icon.svg';
import subtractIcon from '../../assets/icons/subtraction_icon.svg';
import { Operation, type UserActivity } from '../../assets/types';
import useKeydown from '../../shared/hooks/useKeydown';
import { toggleOperations } from '../../store/GameSettingSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { ActivityHeatmap, type ActivityHeatmapProps } from './ActivityHeatmap/ActivityHeatmap';
import { OperatorToggleButton } from './OperatorToggleButton/OperatorToggleButton';

import styles from './IntroPanel.module.css';

export interface IntroPanelProps {
	year: number;
	userActivities: UserActivity[];
	userActivitiesStreak: number;
	onStartButtonClicked: () => void;
}

export function IntroPanel({
	userActivities,
	year,
	userActivitiesStreak,
	onStartButtonClicked
}: IntroPanelProps): JSX.Element {
	const dispatch = useAppDispatch();

	useKeydown('Enter', onStartButtonClicked);

	const heatmapProps: ActivityHeatmapProps = { year: year, userActivities, userActivitiesStreak };
	const selectedOperation: Operation = useAppSelector((state) => state.gameSetting.selectedOperations);

	const handleOperationsChange = (operation: Operation) => {
		dispatch(toggleOperations(operation));
	};

	return (
		<>
			<div className={styles.panel}>
				<h2>Ready to Do Quick Math?</h2>
				<button className={styles.start_button} onClick={onStartButtonClicked}>
					Start
				</button>
				<div className={styles.instruction}>Press Enter or click Start</div>
				<div className={styles.operator_container}>
					<OperatorToggleButton
						operation={Operation.Add}
						selectedOperations={selectedOperation}
						onOperatorButtonClick={handleOperationsChange}
					>
						<img src={addIcon} width={20} height={20} alt="add" />
					</OperatorToggleButton>
					<OperatorToggleButton
						operation={Operation.Subtract}
						selectedOperations={selectedOperation}
						onOperatorButtonClick={handleOperationsChange}
					>
						<img src={subtractIcon} width={20} height={20} alt="subtract" />
					</OperatorToggleButton>
					<OperatorToggleButton
						operation={Operation.Multiply}
						selectedOperations={selectedOperation}
						onOperatorButtonClick={handleOperationsChange}
					>
						<img src={multiplyIcon} width={20} height={20} alt="multiplication" />
					</OperatorToggleButton>
				</div>
				<ActivityHeatmap {...heatmapProps} />
			</div>
		</>
	);
}
