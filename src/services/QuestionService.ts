import type { Question } from "../assets/types";

class QuestionService
{
    // Define operators and their operations
    private static operatorMap: Map<string, (a: number, b: number) => number> = new Map([
        ['+', (a, b) => a + b],
        ['-', (a, b) => a - b],
        ['x', (a, b) => a * b],
        ['/', (a, b) => a / b]
    ]);

    public static getAnswer(expression: string): number
    {
        expression = expression.replaceAll(' ', '');


        const match = expression.match(/^(\d+)([+\-x/])(\d+)$/);
        
        if (!match) {
            throw new Error('Invalid expression format');
        }

        const [, num1Str, operator, num2Str] = match;
        const operation = this.operatorMap.get(operator);
        
        if (!operation) {
            throw new Error('Invalid operator');
        }

        return operation(Number(num1Str), Number(num2Str));
    }

    public static getQuestion(id: string, num1: number, num2: number, operator: string): Question
    {
        const fn = this.operatorMap.get(operator);

        if (!fn)
        {
            throw new Error('Invalid operator');
        }

        return {
            expression: this.getExpression(num1, num2, operator),
            id: id
        }
    }

    public static getExpression(num1: number, num2: number, operator: string): string
    {
        return `${num1} ${operator} ${num2}`;
    }
}

export default QuestionService

