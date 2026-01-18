import { type NavigateFunction, Route, Routes, useNavigate } from 'react-router-dom';

import { type JSX, useCallback, useReducer, useRef } from 'react';

import { Operation, type Question, type QuestionAnswer } from './assets/types';
import { CalculationPanel, type CalculationPanelProps } from './components/CalculationPanel/CalculationPanel';
import { IntroPanel, type IntroPanelProps } from './components/IntroPanel/IntroPanel';
import { Score, type ScoreProps } from './components/Score/Score';
import paths from './routes/routes';
import { AppSettingContext, type AppSettingContextValue } from './shared/context/AppSettingContext';
import usePersistentState from './shared/hooks/usePersistentState';
import { useUserActivities } from './shared/hooks/useUserActivities';
import { gameSessionReducer } from './shared/reducers/GameSessionReducer';
import { DateStringFormat, DateUtilitiesService } from './shared/services/DateUtilitiesService';
import GeneratedQuestionService from './shared/services/GeneratedQuestionService';
import type FetchQuestionService from './shared/services/RetrieveQuestionService';
import LocalStorageUserActivityService from './shared/services/UserActivityService/LocalStorageUserActivityService';
import type UserActivityService from './shared/services/UserActivityService/UserActivityService';

import './App.css';

function App(): JSX.Element {
	const [selectedOperations, setSelectedOperations] = usePersistentState<Operation>('operation', Operation.Add);
	const [gameSession, dispatch] = useReducer(gameSessionReducer.reducer, gameSessionReducer.initialState);

	const fetchQuestionService: FetchQuestionService = useRef(new GeneratedQuestionService()).current;
	const userActivityService: UserActivityService = useRef(new LocalStorageUserActivityService()).current;
	const navigate: NavigateFunction = useNavigate();
	const { userActivities, streak, addUserActivity } = useUserActivities(
		DateUtilitiesService.getCurrentUTCYear(),
		userActivityService
	);

	const { answers, questions } = gameSession;

	const handleStart = async () => {
		const questionsFromApi: Question[] | null = await fetchQuestionService.getQuestion(selectedOperations);

		if (questionsFromApi != null) {
			dispatch({ type: 'init', questions: questionsFromApi });
			navigate(paths.calculate);
		}
	};

	const handleQuestionAnswered = (answer: QuestionAnswer) => {
		dispatch({ type: 'answer_added', answer });
	};

	const handleReset = () => {
		dispatch({ type: 'reset' });
		navigate(paths.home);
	};

	const handleOperationClicked = (operation: Operation) => {
		setSelectedOperations((prevOperation) => {
			const newOperation: Operation =
				prevOperation & operation ? prevOperation & ~operation : prevOperation | operation;

			return newOperation ? newOperation : prevOperation;
		});
	};

	const handleGameCompleted = useCallback(() => {
		addUserActivity();
	}, [addUserActivity]);

	const introPanelProps: IntroPanelProps = {
		selectedOperations: selectedOperations,
		year: DateUtilitiesService.getCurrentUTCYear(),
		userActivities: userActivities,
		userActivitiesStreak: streak,
		onOperationClicked: handleOperationClicked,
		onStart: handleStart
	};

	const calculationPanelProps: CalculationPanelProps = {
		answers: answers,
		questions: questions,
		onQuestionAnswered: handleQuestionAnswered
	};

	const scorePanelProps: ScoreProps = {
		answers: answers,
		onAgain: handleReset,
		onGameComplete: handleGameCompleted
	};

	const appSettingContextValue: AppSettingContextValue = {
		dateKeyFormat: DateStringFormat.YearMonthDay
	};

	return (
		<div className="quick_math_app">
			<AppSettingContext.Provider value={appSettingContextValue}>
				<Routes>
					<Route path="/" element={<IntroPanel {...introPanelProps} />} />
					<Route path="/calculate" element={<CalculationPanel {...calculationPanelProps} />} />
					<Route path="/score" element={<Score {...scorePanelProps} />} />
				</Routes>
			</AppSettingContext.Provider>
		</div>
	);
}

export default App;
