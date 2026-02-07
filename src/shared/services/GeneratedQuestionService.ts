import { Operation, type Question } from '../../assets/types';

import QuestionService from './QuestionService';
import RetrieveQuestionService from './RetrieveQuestionService';

class GeneratedQuestionService extends RetrieveQuestionService {
	private maxDigits: number = 2;
	private maxQuestionCount: number = 9;
	private minQuestionCount: number = 6;
	private availableOperations: Operation[] = [Operation.Add, Operation.Subtract, Operation.Multiply];

	public async getQuestion(selectedOperations: Operation): Promise<Question[] | null> {
		const questionCount = this.randomNumber(this.minQuestionCount, this.maxQuestionCount);
		const questions: Question[] = [];
		const operations: Operation[] = this.availableOperations.filter((op) => (selectedOperations & op) !== 0);

		let id: number = 0;
		while (questions.length < questionCount) {
			id++;
			const multiplier1: number = 10 ** this.randomNumber(1, this.maxDigits);
			const multiplier2: number = 10 ** this.randomNumber(1, this.maxDigits);
			const num1: number = Math.floor(multiplier1 * Math.random());
			const num2: number = Math.floor(multiplier2 * Math.random());

			const randomOperation: Operation = operations[this.randomNumber(0, operations.length - 1)];

			if (randomOperation == Operation.Subtract && num1 < num2) {
				questions.push(QuestionService.getQuestion(id.toString(), num2, num1, randomOperation));
			} else {
				questions.push(QuestionService.getQuestion(id.toString(), num1, num2, randomOperation));
			}
		}

		return questions;
	}

	public randomNumber(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

export default GeneratedQuestionService;
