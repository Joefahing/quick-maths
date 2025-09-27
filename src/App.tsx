import 
{ 
  useEffect, 
  useRef, 
  useState, 
  type JSX 
}                                                   from 'react'
import { IntroPanel }                               from './components/IntroPanel/IntroPanel';
import 
{ 
  CalculationPanel, 
  type CalculationPanelProp 
}                                                   from './components/CalculationPanel/CalculationPanel';
import { Score }                                    from './components/Score/Score';
import type { Question, QuestionAnswer }            from './assets/types'
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

function App(): JSX.Element 
{
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswer[]>([]);

  const navigate: NavigateFunction = useNavigate();
  const fetchQuestionService: FetchQuestionService = useRef(new GeneratedQuestionService()).current;

  useEffect(() => {
    fetchQuestionService.getQuestion().then((questionsFromApi: Question[] | null) =>
    {
      if (questionsFromApi != null)
      {
        setQuestions(questionsFromApi);
      }
    });
  }, []);

 
  const handleStart = (): void =>
  {
    navigate(paths.calculate);
  }

  const handleQuestionAnswered = (answeredQuestion: QuestionAnswer): void =>
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
    fetchQuestionService.getQuestion().then((questionsFromApi: Question[] | null) =>
    {
      if (questionsFromApi != null)
      {
        setQuestions(questionsFromApi);
      }
    });
  }

  const currentIndex: number = questionAnswers.length;
  const calculationPanelProp : CalculationPanelProp = {
      questions: questions,
      answers: questionAnswers,
      currentIndex: currentIndex,
      onQuestionAnswered: handleQuestionAnswered
  }

  return (
    <div className='quick-math-app'>
      <Routes>
        <Route path="/" element={ <IntroPanel onStart={handleStart}/>} />
        <Route path="/calculate" element={ <CalculationPanel {...calculationPanelProp}/> }/>
        <Route path="/score" element={ <Score answers={questionAnswers} onAgain={handleReset} /> }/>
      </Routes>
    </div>
  );
}

export default App
