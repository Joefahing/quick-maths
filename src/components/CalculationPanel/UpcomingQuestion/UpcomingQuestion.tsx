import type { JSX } from 'react';

import styles from './UpcomingQuestion.module.css';

// TODO: To be remove
function UpcomingQuestion(prop: { expression: string | undefined }): JSX.Element {
	return <>{prop.expression && <div className={styles.expression}>{prop.expression}</div>}</>;
}

export default UpcomingQuestion;
