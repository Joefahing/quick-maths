import { useEffect, useRef, useState, type JSX } from "react";
import styles from './MainCalculationQuestion.module.css';

function MainCalculationQuestion(prop: {expression: string, onAnswerEntered: (answer: number) => void}): JSX.Element
{
    const [inputValue, setInputValue] = useState<string>('');

    const inputRef = useRef<HTMLInputElement | null>(null);
    const {expression, onAnswerEntered} = prop;

    const handleAnswer = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (event.key !== 'Enter') return;
        
        const raw = event.currentTarget.value.trim();
        if (raw === '') return;
        
        const value = Number(raw);
        if (Number.isNaN(value)) return;
        
        onAnswerEntered(value);
        setInputValue('');
    };

    useEffect(() => inputRef.current?.focus(), [expression]);

    return (
        <>
            <div className={styles.question}>
                <div className={styles.expression}>{expression}</div>
                <input 
                    className={styles.answer_input}
                    type="text"
                    pattern="[0-9]*"
                    inputMode="text"
                    maxLength={8}
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleAnswer}/>
                <div>Press enter to submit</div>
            </div>
        </>
    );
}

export default MainCalculationQuestion;
