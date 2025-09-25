import type { JSX }                                 from "react";
import styles                                       from './PreviousQuestion.module.css';
import type { QuestionAnswer }                      from "../../../assets/types";
import classNames                                   from "classnames/bind";

const cx = classNames.bind(styles);

function PreviousQuestion(prop: {answer: QuestionAnswer}): JSX.Element
{
    const {question, answer, isCorrect} = prop.answer;

    const expression: string = `${question.expression} = ${answer}`;
    const expressionClassName: string = cx({
        expression: true,
        incorrect: !isCorrect
    });

    return (
        <>
            <div className={expressionClassName}>
                {expression}
            </div>
        </>
    );
}

export default PreviousQuestion;