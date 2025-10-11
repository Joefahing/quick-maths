import type { JSX, ReactNode } 						from "react";
import type { Operation } 							from "../../../assets/types";
import styles 										from "./OperatorToggleButton.module.css"
import classNames									from "classnames/bind";

const className = classNames.bind(styles);

export function OperatorToggleButton({children, operation, selectedOperations, onOperatorButtonClick}: OperatorToggleButtonProps): JSX.Element
{
    const operatorClassName: string = className({
        operator_button: true,
        selected: (selectedOperations & operation) != 0
    });

    return (
        <button className={operatorClassName} onClick={() => onOperatorButtonClick(operation)}>
            {children}
        </button>
    );
}

export interface OperatorToggleButtonProps
{
    children: ReactNode;
    operation: Operation;
    selectedOperations: Operation;
    onOperatorButtonClick: (operation: Operation) => void;
}