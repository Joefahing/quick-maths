import { type NavigateFunction, Route, Routes, useNavigate } from 'react-router-dom';

import { type JSX, useCallback, useEffect, useReducer, useRef, useState } from 'react';

import { type Activity, Operation, type Question, type QuestionAnswer } from './assets/types';
import { CalculationPanel, type CalculationPanelProps } from './components/CalculationPanel/CalculationPanel';
import { IntroPanel, type IntroPanelProps } from './components/IntroPanel/IntroPanel';
import { Score, type ScoreProps } from './components/Score/Score';
import paths from './routes/routes';
import GeneratedQuestionService from './services/GeneratedQuestionService';
import type FetchQuestionService from './services/RetrieveQuestionService';
import usePersistentState from './shared/hooks/usePersistentState';
import { gameSessionReducer } from './shared/reducers/GameSessionReducer';
import LocalStorageUserActivityService from './shared/services/ActivityService/LocalStorageUserActivityService';
import type UserActivityService from './shared/services/ActivityService/UserActivityService';
import { DateUtilitiesService } from './shared/services/DateUtilitiesService';

import './App.css';

function App(): JSX.Element {
	const [selectedOperations, setSelectedOperations] = usePersistentState<Operation>('operation', Operation.Add);
	const [activities, setActivities] = useState<Activity[]>([]);
	const [gameSession, dispatch] = useReducer(gameSessionReducer.reducer, gameSessionReducer.initialState);
	const navigate: NavigateFunction = useNavigate();

	const fetchQuestionService: FetchQuestionService = useRef(new GeneratedQuestionService()).current;
	const userActivityService: UserActivityService = useRef(new LocalStorageUserActivityService()).current;

	const { answers, questions } = gameSession;

	useEffect(() => {
		const initActivities = async () => {
			const firstDayOfYear: Date = DateUtilitiesService.getFirstUTCDayOfYear(DateUtilitiesService.getCurrentUTCYear());
			const lastDayOfYear: Date = DateUtilitiesService.getLastUTCDayOfYear(DateUtilitiesService.getCurrentUTCYear());
			const userActivities: Activity[] = await userActivityService.getUserActivities(firstDayOfYear, lastDayOfYear);
			setActivities(userActivities);
		};

		initActivities();
	}, []);

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

	const handleGameCompleted = useCallback(async () => {
		try {
			const activity: Activity = await userActivityService.addUserActivity(DateUtilitiesService.getUTCToday());
			console.log(`added ${activity}`);
		} catch (error) {
			// Todo: Will implement error handling strategy later
			console.log(error);
		}
	}, []);

	const introPanelProps: IntroPanelProps = {
		selectedOperations: selectedOperations,
		year: DateUtilitiesService.getCurrentUTCYear(),
		activities: activities,
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

	return (
		<div className="quick_math_app">
			<Routes>
				<Route path="/" element={<IntroPanel {...introPanelProps} />} />
				<Route path="/calculate" element={<CalculationPanel {...calculationPanelProps} />} />
				<Route path="/score" element={<Score {...scorePanelProps} />} />
			</Routes>
		</div>
	);
}

export default App;
