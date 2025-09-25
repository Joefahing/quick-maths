import 
{ 
  useEffect, 
  useRef, 
  useState, 
  type JSX 
}                                                   from 'react'
import { GameStatus }                               from './assets/types'
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

function App(): JSX.Element 
{
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Ready);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswer[]>([]);

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

  const handleStatusChange = (newGameStatus: GameStatus): void =>
  {
    setGameStatus(newGameStatus);
  }

  const handleQuestionAnswered = (answeredQuestion: QuestionAnswer): void =>
  {
    const newQuestionAnswers = [...questionAnswers, answeredQuestion];
    setQuestionAnswers(newQuestionAnswers);

    if (newQuestionAnswers.length === questions.length)
    {
      setGameStatus(GameStatus.Finished);
    }
  }

  const handleReset = (): void =>
  {
    setGameStatus(GameStatus.Ready);
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

  const currentPanel = (): JSX.Element =>
  {
    if (gameStatus === GameStatus.Ready) 
    {
      return <IntroPanel onStart={() => handleStatusChange(GameStatus.Playing)}/>
    }
    else if (gameStatus === GameStatus.Playing) 
    {
      return <CalculationPanel {...calculationPanelProp}/>
    }
    else
    {
      return <Score answers={questionAnswers} onAgain={handleReset} />
    }
  };

  return (
    <div className='quick-math-app'>{currentPanel()}</div>
  );
}

export default App
