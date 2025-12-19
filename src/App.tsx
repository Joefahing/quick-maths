import { type NavigateFunction, Route, Routes, useNavigate } from 'react-router-dom';

import { type JSX, useReducer, useRef } from 'react';

import { Operation, type Question, type QuestionAnswer } from './assets/types';
import { CalculationPanel, type CalculationPanelProp } from './components/CalculationPanel/CalculationPanel';
import { IntroPanel, type IntroPanelProps } from './components/IntroPanel/IntroPanel';
import { Score } from './components/Score/Score';
import paths from './routes/routes';
import GeneratedQuestionService from './services/GeneratedQuestionService';
import type FetchQuestionService from './services/RetrieveQuestionService';
import usePersistentState from './shared/hooks/usePersistentState';
import { gameSessionReducer } from './shared/reducers/GameSessionReducer';

import './App.css';

function App(): JSX.Element {
	const [selectedOperations, setSelectedOperations] = usePersistentState<Operation>('operation', Operation.Add);
	const [gameSession, dispatch] = useReducer(gameSessionReducer.reducer, gameSessionReducer.initialState);
	const navigate: NavigateFunction = useNavigate();

	const { answers, questions } = gameSession;
	const fetchQuestionService: FetchQuestionService = useRef(new GeneratedQuestionService()).current;

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

	const introPanelProps: IntroPanelProps = {
		selectedOperations: selectedOperations,
		onOperationClicked: handleOperationClicked,
		onStart: handleStart
	};

	const calculationPanelProp: CalculationPanelProp = {
		answers: answers,
		questions: questions,
		onQuestionAnswered: handleQuestionAnswered
	};

	return (
		<div className="quick_math_app">
			<Routes>
				<Route path="/" element={<IntroPanel {...introPanelProps} />} />
				<Route path="/calculate" element={<CalculationPanel {...calculationPanelProp} />} />
				<Route path="/score" element={<Score answers={answers} onAgain={handleReset} />} />
			</Routes>
		</div>
	);
}

export default App;
