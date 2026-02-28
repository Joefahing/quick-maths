import { type JSX, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import type { CopyButtonContent, CopyStatus } from '../../../assets/types';

import CopyButtonService from './CopyButtonService';

import classes from './CopyButton.module.css';

const cx = classNames.bind(classes);

export interface CopyButtonProps {
	copyValue: string;
	resetDelayMs?: number;
}

const defaultResetDelayMs: number = 3000;

export function CopyButton({ copyValue, resetDelayMs = defaultResetDelayMs }: CopyButtonProps): JSX.Element {
	const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');

	useEffect(() => {
		if (copyStatus === 'idle') return;

		const timeoutId: number = setTimeout(() => {
			setCopyStatus('idle');
		}, resetDelayMs);

		return () => clearTimeout(timeoutId);
	}, [copyStatus, resetDelayMs]);

	const handleCopyValue = async () => {
		try {
			if (copyStatus === 'idle') {
				await navigator.clipboard.writeText(copyValue);
				setCopyStatus('success');
			}
		} catch {
			setCopyStatus('error');
		}
	};

	const copyButtonContent: CopyButtonContent = CopyButtonService.getCopyStatusContent(copyStatus);

	return (
		<button type="button" className={cx('copy_button', copyStatus)} onClick={handleCopyValue}>
			<img src={copyButtonContent.iconSrc} alt={copyButtonContent.iconAlt} />
			<span>{copyButtonContent.buttonText}</span>
		</button>
	);
}
