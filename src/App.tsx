import 
{ 
  useRef, 
  useState, 
  type JSX 
}                                                   from 'react'
import 
{ 
  IntroPanel, 
  type IntroPanelProps 
}                                                   from './components/IntroPanel/IntroPanel';
import 
{ 
  CalculationPanel, 
  type CalculationPanelProp 
}                                                   from './components/CalculationPanel/CalculationPanel';
import { Score }                                    from './components/Score/Score';
import  
{
  type Question, 
  type QuestionAnswer, 
  Operation
}            from './assets/types'
import type FetchQuestionService                    from './services/RetrieveQuestionService';
import GeneratedQuestionService                     from './services/GeneratedQuestionService';
import './App.css'
import 
{ 
  Route, 
  Routes, 
  useNavigate, 
  type NavigateFunction 
}                                                   from 'react-router-dom';
import paths                                        from './routes/routes';

// TODO: Investigate context api
// TODO: Refactor this component to reduce states and handlers

function App(): JSX.Element 
{
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswer[]>([]);
  const [selectedOperations, setSelectedOperations] = useState<Operation>(Operation.Add);

  const navigate: NavigateFunction = useNavigate();
  const fetchQuestionService: FetchQuestionService = useRef(new GeneratedQuestionService()).current;
   
  const handleStart = async () => 
  {
    const questionsFromApi: Question[] | null = await fetchQuestionService.getQuestion(selectedOperations);
  
    if (questionsFromApi != null)
    {
      setQuestions(questionsFromApi);
      navigate(paths.calculate);
    }
  }
    
  const handleQuestionAnswered = (answeredQuestion: QuestionAnswer) =>
  {
    const newQuestionAnswers = [...questionAnswers, answeredQuestion];
    setQuestionAnswers(newQuestionAnswers);

    if (newQuestionAnswers.length === questions.length)
    {
      navigate(paths.score);
    }
  }

  const handleReset = (): void =>
  {
    navigate(paths.home);
    setQuestionAnswers([]);
  }

  const handleOperationClicked = (operation: Operation) =>
  {
    setSelectedOperations((prevOperation) =>
    {
      const newOperation: Operation = (prevOperation & operation) ? 
        (prevOperation & ~operation) : (prevOperation | operation);
        
      return newOperation ? newOperation : prevOperation;
    });
  }

  const introPanelProps: IntroPanelProps = {
    selectedOperations: selectedOperations,
    onOperationClicked: handleOperationClicked,
    onStart: handleStart
  };
  
  const calculationPanelProp: CalculationPanelProp = {
      questions: questions,
      answers: questionAnswers,
      currentIndex: questionAnswers.length,
      selectedOperations: selectedOperations,
      onQuestionAnswered: handleQuestionAnswered
  };

  return (
    <div className='quick-math-app'>
      <Routes>
        <Route path="/" element={ <IntroPanel {...introPanelProps}/>} />
        <Route path="/calculate" element={ <CalculationPanel {...calculationPanelProp}/> }/>
        <Route path="/score" element={ <Score answers={questionAnswers} onAgain={handleReset} /> }/>
      </Routes>
    </div>
  );
}

export default App