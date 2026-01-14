import { type JSX } from 'react';

import addIcon from '../../assets/icons/add_icon.svg';
import multiplyIcon from '../../assets/icons/multiplication_icon.svg';
import subtractIcon from '../../assets/icons/subtraction_icon.svg';
import { Operation,type UserActivity } from '../../assets/types';
import useKeydown from '../../shared/hooks/useKeydown';

import { ActivityHeatmap, type ActivityHeatmapProps } from './ActivityHeatmap/ActivityHeatmap';
import { OperatorToggleButton } from './OperatorToggleButton/OperatorToggleButton';

import styles from './IntroPanel.module.css';

export interface IntroPanelProps {
	selectedOperations: Operation;
	year: number;
	userActivities: UserActivity[];
	onStart: () => void;
	onOperationClicked: (operation: Operation) => void;
}

export function IntroPanel({
	selectedOperations,
	userActivities,
	year,
	onStart,
	onOperationClicked
}: IntroPanelProps): JSX.Element {
	useKeydown('Enter', onStart);

	const heatmapProps: ActivityHeatmapProps = { year, userActivities };

	return (
		<>
			<div className={styles.panel}>
				<h2>Ready to Do Quick Math?</h2>
				<button className={styles.start_button} onClick={onStart}>
					Start
				</button>
				<div className={styles.instruction}>Press Enter or click Start</div>
				<div className={styles.operator_container}>
					<OperatorToggleButton
						operation={Operation.Add}
						selectedOperations={selectedOperations}
						onOperatorButtonClick={onOperationClicked}
					>
						<img src={addIcon} width={20} height={20} alt="add" />
					</OperatorToggleButton>
					<OperatorToggleButton
						operation={Operation.Subtract}
						selectedOperations={selectedOperations}
						onOperatorButtonClick={onOperationClicked}
					>
						<img src={subtractIcon} width={20} height={20} alt="subtract" />
					</OperatorToggleButton>
					<OperatorToggleButton
						operation={Operation.Multiply}
						selectedOperations={selectedOperations}
						onOperatorButtonClick={onOperationClicked}
					>
						<img src={multiplyIcon} width={20} height={20} alt="multiplication" />
					</OperatorToggleButton>
				</div>
				<ActivityHeatmap {...heatmapProps} />
			</div>
		</>
	);
}
