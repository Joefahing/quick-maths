
import useKeydown from '../../assets/hooks/useKeydown';
import styles from './IntroPanel.module.css';

export function IntroPanel(prop: {onStart: () => void})
{
    useKeydown('Enter', prop.onStart)
  
    return (
        <>
            <div className={styles.panel}>
                <h2>Ready to Do Quick Math?</h2>
                <button onClick={prop.onStart}>Start</button>
                <div className={styles.instruction}>Press Enter or click Start</div>
            </div>
        </>
    )
}