import checkIcon from '../../../assets/icons/check_icon.svg';
import copyIcon from '../../../assets/icons/copy_icon.svg';
import errorIcon from '../../../assets/icons/error_icon.svg';
import type { CopyButtonContent, CopyStatus } from '../../../assets/types';

export default class CopyButtonService {
	public static getCopyStatusContent(status: CopyStatus): CopyButtonContent {
		switch (status) {
			case 'success':
				return {
					iconSrc: checkIcon,
					iconAlt: 'Copied',
					buttonText: 'Copied'
				};
			case 'error':
				return {
					iconSrc: errorIcon,
					iconAlt: 'Copy Error',
					buttonText: 'Error'
				};
			default:
				return {
					iconSrc: copyIcon,
					iconAlt: 'Copy',
					buttonText: 'Copy'
				};
		}
	}
}
