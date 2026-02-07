import { Operation, type Question } from '../../assets/types';

class QuestionService {
	// Define operators and their operations
	private static operatorMap: Map<string, (a: number, b: number) => number> = new Map([
		['+', (a, b) => a + b],
		['-', (a, b) => a - b],
		['x', (a, b) => a * b],
		['/', (a, b) => a / b]
	]);

	private static operatorSymbolMap: Map<Operation, string> = new Map<Operation, string>([
		[Operation.Add, '+'],
		[Operation.Subtract, '-'],
		[Operation.Multiply, 'x']
	]);

	public static getAnswer(expression: string): number {
		expression = expression.replaceAll(' ', '');

		const match = expression.match(/^(\d+)([+\-x/])(\d+)$/);

		if (!match) {
			throw new Error('Invalid expression format');
		}

		const [, num1Str, operator, num2Str] = match;
		const equation = this.operatorMap.get(operator);

		if (!equation) {
			throw new Error('Invalid operator');
		}

		return equation(Number(num1Str), Number(num2Str));
	}

	public static getQuestion(id: string, num1: number, num2: number, operator: Operation): Question {
		const symbol = this.operatorSymbolMap.get(operator);

		if (!symbol) {
			throw new Error('Invalid operator');
		}

		const fn = this.operatorMap.get(symbol);

		if (!fn) {
			throw new Error('Invalid operator');
		}

		return {
			expression: this.getExpression(num1, num2, symbol),
			id: id
		};
	}

	public static getExpression(num1: number, num2: number, operator: string): string {
		return `${num1} ${operator} ${num2}`;
	}
}

export default QuestionService;
