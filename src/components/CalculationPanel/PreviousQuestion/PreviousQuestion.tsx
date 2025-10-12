import classNames from 'classnames/bind';
import type { JSX } from 'react';

import type { QuestionAnswer } from '../../../assets/types';

import styles from './PreviousQuestion.module.css';

const cx = classNames.bind(styles);

function PreviousQuestion(prop: { answer: QuestionAnswer }): JSX.Element {
  const { question, answer, isCorrect } = prop.answer;

  const expression: string = `${question.expression} = ${answer}`;
  const expressionClassName: string = cx({
    expression: true,
    incorrect: !isCorrect
  });

  return <div className={expressionClassName}>{expression}</div>;
}

export default PreviousQuestion;
