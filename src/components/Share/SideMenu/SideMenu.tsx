import { type NavigateFunction, useNavigate } from 'react-router-dom';

import type { JSX } from 'react';

import aboutMeIcon from '../../../assets/icons/about_me_icon.svg';
import contactIcon from '../../../assets/icons/email_icon.svg';
import homeIcon from '../../../assets/icons/home_icon.svg';
import settingsIcon from '../../../assets/icons/settings_icon.svg';
import updatesIcon from '../../../assets/icons/updates_icon.svg';
import paths from '../../../routes/routes';

import { SideMenuButton } from './SideMenuButton/SideMenuButton';

import classes from './SideMenu.module.css';

export function SideMenu(): JSX.Element {
	const navigate: NavigateFunction = useNavigate();
	const iconSize: number = 28;

	return (
		<aside className={classes.side_menu}>
			<div className={classes.side_menu_label_expander}>
				<div className={classes.side_menu_container}>
					<SideMenuButton label="Home" onClicked={() => navigate(paths.home)}>
						<img width={iconSize} height={iconSize} src={homeIcon} alt="Home" />
					</SideMenuButton>
					<SideMenuButton label="Settings" onClicked={() => navigate(paths.settings)}>
						<img width={iconSize} height={iconSize} src={settingsIcon} alt="Settings" />
					</SideMenuButton>
					<SideMenuButton label="Updates" onClicked={() => navigate(paths.updates)}>
						<img width={iconSize} height={iconSize} src={updatesIcon} alt="Updates" />
					</SideMenuButton>
					<SideMenuButton label="About Me" onClicked={() => navigate(paths.about)}>
						<img width={iconSize} height={iconSize} src={aboutMeIcon} alt="About Me" />
					</SideMenuButton>
					<SideMenuButton label="Contact" onClicked={() => navigate(paths.contact)}>
						<img width={iconSize} height={iconSize} src={contactIcon} alt="Contact" />
					</SideMenuButton>
				</div>
			</div>
		</aside>
	);
}
