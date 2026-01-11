import { useCallback, useEffect, useRef, useState } from 'react';
import type { JSX, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import classes from './ToolTip.module.css';

type Position = {
	left: number;
	top: number;
};

export interface ToolTipProps {
	content: string;
	children: ReactNode;
}

export function ToolTip({ content, children }: ToolTipProps): JSX.Element {
	const [isMounted, setMounted] = useState<boolean>(false);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
	const wrapperRef = useRef<HTMLSpanElement>(null);

	const updatePosition = useCallback(() => {
		const anchor = wrapperRef.current;
		if (!anchor) {
			return;
		}

		const rect = anchor.getBoundingClientRect();
		setPosition({
			left: rect.left + rect.width / 2,
			top: rect.top
		});
	}, []);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!isVisible) {
			return;
		}

		updatePosition();

		const handleScroll = () => updatePosition();
		const handleResize = () => updatePosition();

		window.addEventListener('scroll', handleScroll, true);
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('scroll', handleScroll, true);
			window.removeEventListener('resize', handleResize);
		};
	}, [isVisible, updatePosition]);

	const showTooltip = () => {
		setIsVisible(true);
		updatePosition();
	};

	const hideTooltip = () => {
		setIsVisible(false);
	};

	return (
		<span
			className={classes.wrapper}
			ref={wrapperRef}
			onMouseEnter={showTooltip}
			onMouseLeave={hideTooltip}
			onFocus={showTooltip}
			onBlur={hideTooltip}
		>
			{children}
			{isMounted &&
				isVisible &&
				createPortal(
					<div role="tooltip" className={classes.tooltip} style={{ left: position.left, top: position.top }}>
						{content}
					</div>,
					document.body
				)}
		</span>
	);
}
