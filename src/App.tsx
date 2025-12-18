import { type NavigateFunction, Route, Routes, useNavigate } from 'react-router-dom';

import { type JSX, useRef, useState } from 'react';

import { Operation, type Question, type QuestionAnswer } from './assets/types';
import { CalculationPanel, type CalculationPanelProp } from './components/CalculationPanel/CalculationPanel';
import { IntroPanel, type IntroPanelProps } from './components/IntroPanel/IntroPanel';
import { Score } from './components/Score/Score';
import paths from './routes/routes';
import GeneratedQuestionService from './services/GeneratedQuestionService';
import type FetchQuestionService from './services/RetrieveQuestionService';
import usePersistentState from './shared/hooks/usePersistentState';

import './App.css';

// TODO: Refactor this component to reduce states and handlers

function App(): JSX.Element {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [answers, setAnswers] = useState<QuestionAnswer[]>([]);
	const [selectedOperations, setSelectedOperations] = usePersistentState<Operation>('operation', Operation.Add);

	const navigate: NavigateFunction = useNavigate();
	const fetchQuestionService: FetchQuestionService = useRef(new GeneratedQuestionService()).current;

	const handleStart = async () => {
		const questionsFromApi: Question[] | null = await fetchQuestionService.getQuestion(selectedOperations);

		if (questionsFromApi != null) {
			setAnswers([]);
			setQuestions(questionsFromApi);
			navigate(paths.calculate);
		}
	};

	const handleQuestionAnswered = (answeredQuestion: QuestionAnswer) => {
		const newanswers = [...answers, answeredQuestion];
		setAnswers(newanswers);
	};

	const handleReset = () => {
		navigate(paths.home);
		setAnswers([]);
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
		<div className="quick-math-app">
			<Routes>
				<Route path="/" element={<IntroPanel {...introPanelProps} />} />
				<Route path="/calculate" element={<CalculationPanel {...calculationPanelProp} />} />
				<Route path="/score" element={<Score answers={answers} onAgain={handleReset} />} />
			</Routes>
		</div>
	);
}

export default App;
