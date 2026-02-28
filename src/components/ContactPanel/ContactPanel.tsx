import { type JSX, useState } from 'react';

import emailMe from '../../assets/pictures/email.webp';
import type { EmailTemplateData, EmailTemplateType } from '../../assets/types';
import { CopyButton } from '../Share/CopyButton/CopyButton';
import { type GroupToggleButton, GroupToggleButtons } from '../Share/GroupToggleButtons/GroupToggleButtons';

import ContactPanelService from './ContactPanelService';

import classes from './ContactPanel.module.css';

export function ContactPanel(): JSX.Element {
	const [emailTemplate, setEmailTemplate] = useState<EmailTemplateType>('feature');

	const handleTemplateChange = (emailTemplate: EmailTemplateType) => setEmailTemplate(emailTemplate);
	const handleEmailMeClick = () => (window.location.href = ContactPanelService.buildMailtoString(emailTemplateData));

	const emailTemplateButtons: GroupToggleButton<EmailTemplateType>[] = [
		{ text: 'Feature', value: 'feature' },
		{ text: 'Bugs', value: 'bug' }
	];

	const emailTemplateData: EmailTemplateData = ContactPanelService.getEmailTemplateData(emailTemplate);
	const email: string = ContactPanelService.email;

	return (
		<section className={classes.contact}>
			<img className={classes.profile_picture} src={emailMe} alt="Email" />
			<div className={classes.contact_wrapper}>
				<h2 title="Contact">Contact</h2>
				<p>Feature suggestion or bug report? Email me:</p>
				<div className={classes.email_display}>
					<span>{email}</span>
					<CopyButton copyValue={email} />
				</div>
				<GroupToggleButtons
					buttons={emailTemplateButtons}
					selectedValue={emailTemplate}
					onGroupToggleButtonClicked={handleTemplateChange}
				/>
				<div className={classes.email_template_container}>
					<h3 className={classes.email_template_title}>Email Template</h3>
					<div className={classes.email_template}>
						<div className={classes.email_template_subject}>
							<strong>Subject:</strong> {emailTemplateData.subject}
						</div>
						<div className={classes.email_template_body}>
							<strong>Body:</strong>
							{emailTemplateData.bodyRow.map((row: string) => (
								<div key={row}>{row}</div>
							))}
						</div>
					</div>
				</div>
				<button onClick={handleEmailMeClick}>Email Me</button>
			</div>
		</section>
	);
}
