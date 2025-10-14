import { type JSX } from 'react';

import addIcon from '../../assets/icons/add_icon.svg';
import multiplyIcon from '../../assets/icons/multiplication_icon.svg';
import subtractIcon from '../../assets/icons/subtraction_icon.svg';
import { Operation } from '../../assets/types';
import useKeydown from '../../shared/hooks/useKeydown';

import { OperatorToggleButton } from './OperatorToggleButton/OperatorToggleButton';

import styles from './IntroPanel.module.css';

export function IntroPanel({ selectedOperations, onStart, onOperationClicked }: IntroPanelProps): JSX.Element {
  useKeydown('Enter', onStart);

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
      </div>
    </>
  );
}
export interface IntroPanelProps {
  selectedOperations: Operation;
  onStart: () => void;
  onOperationClicked: (operation: Operation) => void;
}
