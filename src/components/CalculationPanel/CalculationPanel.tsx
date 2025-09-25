import 
{ 
    useEffect, 
    useState, 
    type JSX 
}                                                   from "react";
import type 
{ 
    Question, 
    QuestionAnswer 
}                                                   from "../../assets/types";
import MainCalculationQuestion                      from "./MainCalculationQuestion/MainCalculationQuestion";
import UpcomingQuestion                             from "./UpcomingQuestion/UpcomingQuestion";
import styles                                       from "./CalculationPanel.module.css";
import PreviousQuestion                             from "./PreviousQuestion/PreviousQuestion";
import QuestionService                              from "../../services/QuestionService";

export function CalculationPanel(prop: CalculationPanelProp): JSX.Element
{
    const [seconds,  setSeconds] = useState<number>(0);

    const {questions, answers, currentIndex, onQuestionAnswered} = prop;
    const lastAnswer: QuestionAnswer | undefined = answers[answers.length - 1] ?? undefined;
    const nextQuestion: Question | undefined = questions[currentIndex + 1] ?? undefined;
    const currentQuestion: Question = questions[currentIndex];

    function handleQuestionEntered(answer: number): void 
    {
        const result: QuestionAnswer = {
            question: currentQuestion,
            isCorrect: QuestionService.getAnswer(currentQuestion.expression) === answer,
            answer: answer,
            time: seconds
        }
        
        onQuestionAnswered(result);
    }

    useEffect(() => 
    {
        const interval: number = setInterval(() =>
        {
            setSeconds(prev => prev + 1);
        }, 1000);
        
        return () => 
        {
            clearInterval(interval);
            setSeconds(0);
        }
    }, []);

    return (
        <>
        <div className={styles.panel}>
            <section className={styles.calculation_container}>
                {lastAnswer && <PreviousQuestion answer={lastAnswer} />}
                <MainCalculationQuestion expression={currentQuestion.expression} onAnswerEntered={handleQuestionEntered}/>
                <UpcomingQuestion expression={nextQuestion?.expression} />
            </section>
            <div className={styles.timer}>
                <p className={styles.time}>Time: {seconds} Seconds</p>
            </div>
        </div>
        </>
    )
}

export interface CalculationPanelProp
{
    questions: Question[];
    answers: QuestionAnswer[];
    currentIndex: number;
    onQuestionAnswered: (question: QuestionAnswer) => void
}
