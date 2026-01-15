import { Operation, type Question } from '../../assets/types';

import QuestionService from './QuestionService';
import RetrieveQuestionService from './RetrieveQuestionService';

class GeneratedQuestionService extends RetrieveQuestionService {
	private maxDigits: number = 2;
	private maxQuestionCount: number = 9;
	private minQuestionCount: number = 6;
	private operatorSymbols: Map<Operation, string> = new Map<Operation, string>([
		[Operation.Add, '+'],
		[Operation.Subtract, '-'],
		[Operation.Multiply, 'x']
	]);

	public async getQuestion(selectedOperations: Operation): Promise<Question[] | null> {
		const questionCount = this.randomNumber(this.minQuestionCount, this.maxQuestionCount);
		const questions: Question[] = [];
		const operations: Operation[] = Array.from(this.operatorSymbols.keys()).filter(
			(op) => (selectedOperations & op) !== 0
		);

		let id: number = 0;
		while (questions.length < questionCount) {
			id++;
			const multiplier1: number = 10 ** this.randomNumber(1, this.maxDigits);
			const multiplier2: number = 10 ** this.randomNumber(1, this.maxDigits);
			const num1: number = Math.floor(multiplier1 * Math.random());
			const num2: number = Math.floor(multiplier2 * Math.random());

			const randomOperation: Operation = operations[this.randomNumber(0, operations.length - 1)];
			const operator: string | undefined = this.operatorSymbols.get(randomOperation);

			if (operator != undefined) {
				questions.push(QuestionService.getQuestion(id.toString(), num1, num2, operator));
			}
		}

		return questions;
	}

	public randomNumber(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

export default GeneratedQuestionService;
