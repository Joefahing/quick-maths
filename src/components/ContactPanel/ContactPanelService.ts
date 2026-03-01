import type { EmailTemplateData, EmailTemplateType } from '../../assets/types';

export default class ContactPanelService {
	public static email: string = 'quickmaths.run@gmail.com';

	public static getEmailTemplateData(emailTemplateType: EmailTemplateType): EmailTemplateData {
		switch (emailTemplateType) {
			case 'feature': {
				return {
					email: ContactPanelService.email,
					subject: 'Quick Maths Feature Request',
					bodyRow: ['Type: Feature', 'Description:', 'Why:']
				};
			}
			default: {
				return {
					email: ContactPanelService.email,
					subject: 'Quick Maths Bug Report',
					bodyRow: ['Type: Bug', 'Device:', 'Expected:', 'Actual:']
				};
			}
		}
	}

	public static buildMailtoString = ({ email, subject, bodyRow }: EmailTemplateData): string => {
		const body = bodyRow.join('\n');
		return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
	};
}
