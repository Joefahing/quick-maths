import { type NavigateFunction, Outlet, useNavigate } from 'react-router-dom';

import { type JSX, useCallback, useRef } from 'react';

import paths from '../../routes/routes';
import { AppSettingContext, type AppSettingContextValue } from '../../shared/context/AppSettingContext';
import { useUserActivities } from '../../shared/hooks/useUserActivities';
import { DateStringFormat, DateUtilitiesService } from '../../shared/services/DateUtilitiesService';
import LocalStorageUserActivityService from '../../shared/services/UserActivityService/LocalStorageUserActivityService';
import type UserActivityService from '../../shared/services/UserActivityService/UserActivityService';
import { startGameSession } from '../../store/GameSessionSlice';
import { useAppDispatch } from '../../store/hooks';
import { type IntroPanelProps } from '../IntroPanel/IntroPanel';
import { type ScorePanelProps } from '../ScorePanel/ScorePanel';
import { SideMenu } from '../Share/SideMenu/SideMenu';

import type { GameOutletContext } from './GameLayoutTypes';

import '../../App.css';
import classes from './GameLayout.module.css';

export function GameLayout(): JSX.Element {
	const dispatch = useAppDispatch();
	const navigate: NavigateFunction = useNavigate();
	const userActivityService: UserActivityService = useRef(new LocalStorageUserActivityService()).current;
	const { userActivities, streak, addUserActivity } = useUserActivities(
		DateUtilitiesService.getCurrentUTCYear(),
		userActivityService
	);

	const handleGameStart = async () => {
		const result = await dispatch(startGameSession());

		if (startGameSession.fulfilled.match(result)) {
			navigate(paths.calculate);
		}
	};

	const handleReset = () => {
		navigate(paths.home);
	};

	const handleGameCompleted = useCallback(() => {
		addUserActivity();
	}, [addUserActivity]);

	const introPanelProps: IntroPanelProps = {
		year: DateUtilitiesService.getCurrentUTCYear(),
		userActivities: userActivities,
		userActivitiesStreak: streak,
		onStartButtonClicked: handleGameStart
	};

	const scorePanelProps: ScorePanelProps = {
		onAgain: handleReset,
		onGameComplete: handleGameCompleted
	};

	const appSettingContextValue: AppSettingContextValue = {
		dateKeyFormat: DateStringFormat.YearMonthDay
	};

	const gameOutletContext: GameOutletContext = {
		introPanelProps,
		scorePanelProps
	};

	return (
		<div className={classes.game_layout}>
			<AppSettingContext.Provider value={appSettingContextValue}>
				<SideMenu />
				<div className={classes.content_container}>
					<Outlet context={gameOutletContext} />
				</div>
			</AppSettingContext.Provider>
		</div>
	);
}
