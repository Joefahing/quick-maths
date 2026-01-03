import type { JSX, ReactNode} from "react";

import classes from './ToolTip.module.css';

export interface ToolTipProps
{
	content: string;
	children: ReactNode;
}
export function ToolTip({content, children}: ToolTipProps): JSX.Element
{
	return (
		<div className={classes.wrapper}>
			<div>{children}</div>
			<div role="tooltip" className={classes.tooltip}>{content}</div>
		</div>
	);
}