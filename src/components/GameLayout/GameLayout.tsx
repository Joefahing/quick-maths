import { type NavigateFunction, Outlet, useNavigate } from 'react-router-dom';

import { type JSX, useCallback, useEffect } from 'react';

import paths from '../../routes/routes';
import { DateUtilitiesService } from '../../shared/services/DateUtilitiesService';
import { startGameSession } from '../../store/GameSessionSlice';
import { useAppDispatch } from '../../store/hooks';
import { addUserActivity, fetchUserActivities } from '../../store/UserActivitySlice';
import { type IntroPanelProps } from '../IntroPanel/IntroPanel';
import { type ScorePanelProps } from '../ScorePanel/ScorePanel';
import { SideMenu } from '../Share/SideMenu/SideMenu';

import type { GameOutletContext } from './GameLayoutTypes';

import '../../App.css';
import classes from './GameLayout.module.css';

export function GameLayout(): JSX.Element {
	const dispatch = useAppDispatch();
	const navigate: NavigateFunction = useNavigate();
	const year = DateUtilitiesService.getCurrentUTCYear();

	useEffect(() => {
		dispatch(fetchUserActivities(year));
	}, [dispatch, year]);

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
		dispatch(addUserActivity());
	}, [dispatch]);

	const introPanelProps: IntroPanelProps = {
		onStartButtonClicked: handleGameStart
	};

	const scorePanelProps: ScorePanelProps = {
		onAgain: handleReset,
		onGameComplete: handleGameCompleted
	};

	const gameOutletContext: GameOutletContext = {
		introPanelProps,
		scorePanelProps
	};

	return (
		<div className={classes.game_layout}>
			<SideMenu />
			<div className={classes.content_container}>
				<Outlet context={gameOutletContext} />
			</div>
		</div>
	);
}
