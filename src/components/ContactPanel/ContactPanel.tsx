import { type JSX, useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import checkIcon from '../../assets/icons/check_icon.svg';
import copyIcon from '../../assets/icons/copy_icon.svg';
import errorIcon from '../../assets/icons/error_icon.svg';
import emailMe from '../../assets/pictures/email.png';
import { type GroupToggleButton, GroupToggleButtons } from '../Share/GroupToggleButtons/GroupToggleButtons';

import classes from './ContactPanel.module.css';

const cx = classNames.bind(classes);

type CopyStatus = 'idle' | 'success' | 'error';
type EmailTemplate = 'none' | 'feature' | 'bug';

interface CopyButtonContent {
	iconSrc: string;
	iconAlt: string;
	buttonText: string;
	className: {
		copy_button: boolean;
		idle: boolean;
		success: boolean;
		error: boolean;
	};
}

export function ContactPanel(): JSX.Element {
	const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');
	const [emailTemplate, setEmailTemplate] = useState<EmailTemplate>('none');

	const email: string = 'quickmaths.run@gmail.com';
	const copyStatusResetTime: number = 3000;
	const emailTemplateButtons: GroupToggleButton<EmailTemplate>[] = [
		{ text: 'Feature', value: 'feature' },
		{ text: 'Bugs', value: 'bug' }
	];

	useEffect(() => {
		let timeoutID: number | null = null;

		if (copyStatus === 'idle') return;

		timeoutID = setTimeout(() => {
			setCopyStatus('idle');
		}, copyStatusResetTime);

		return () => {
			if (timeoutID != null) {
				clearTimeout(timeoutID);
			}
		};

	}, [copyStatus, copyStatusResetTime]);

	const handleCopyEmail = async () => {
		try {
			if (copyStatus === 'idle') {
				await navigator.clipboard.writeText(email);
				setCopyStatus('success');
			}
		} catch {
			setCopyStatus('error');
		}
	};

	const handleTemplateChange = (emailTemplate: EmailTemplate) => {
		setEmailTemplate(emailTemplate);
	};

	const copyButtonContent: CopyButtonContent = getCopyButtonContent(copyStatus);

	return (
		<section className={classes.contact}>
			<img className={classes.profile_picture} src={emailMe} alt="Email" />
			<div className={classes.contact_wrapper}>
				<h2 title="Contact">Contact</h2>
				<p>Feature suggestion or bug report? Email me:</p>
				<div className={classes.email_display}>
					<span>{email}</span>
					<button className={cx(copyButtonContent.className)} onClick={handleCopyEmail}>
						<img src={copyButtonContent.iconSrc} alt={copyButtonContent.iconAlt} />
						<span>{copyButtonContent.buttonText}</span>
					</button>
				</div>
				<GroupToggleButtons
					buttons={emailTemplateButtons}
					selectedValue={emailTemplate}
					onGroupToggleButtonClicked={handleTemplateChange}
				/>
				<div className={classes.email_template_container}>
					<h3 className={classes.email_template_title}>Email Template</h3>
					<div className={classes.email_template}></div>
				</div>
				<button>Email Me</button>
			</div>
		</section>
	);
}

function getCopyButtonContent(status: CopyStatus): CopyButtonContent {
	switch (status) {
		case 'success':
			return {
				iconSrc: checkIcon,
				iconAlt: 'Email Copied',
				buttonText: 'Copied',
				className: {
					copy_button: true,
					idle: false,
					success: true,
					error: false
				}
			};
		case 'error':
			return {
				iconSrc: errorIcon,
				iconAlt: 'Copy Error',
				buttonText: 'Error',
				className: {
					copy_button: true,
					idle: false,
					success: false,
					error: true
				}
			};
		default:
			return {
				iconSrc: copyIcon,
				iconAlt: 'Copy Email',
				buttonText: 'Copy',
				className: {
					copy_button: true,
					idle: true,
					success: false,
					error: false
				}
			};
	}
}
