import { type Operation, type Question } from '../assets/types';

abstract class RetrieveQuestionService {
	public abstract getQuestion(selectedOperations: Operation): Promise<Question[] | null>;
}

export default RetrieveQuestionService;
