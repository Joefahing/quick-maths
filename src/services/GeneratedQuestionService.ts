import type { Question } from "../assets/types";
import QuestionService from "./QuestionService";
import RetrieveQuestionService from "./RetrieveQuestionService";

class GeneratedQuestionService extends RetrieveQuestionService
{
    private maxDigits: number = 2;
    private maxQuestionCount: number = 15;
    private minQuestionCount: number = 10;
    private operators: string[] = ['+', '-', 'x'];

    public async getQuestion(): Promise<Question[] | null> {
        
        const questionCount = this.randomNumber(this.minQuestionCount, this.maxQuestionCount);
        const questions: Question[] = [];

        for (let i = 1; i <= questionCount; i++)
        {
            const multiplier1: number = Math.pow(10, this.randomNumber(1, this.maxDigits));
            const multiplier2: number = Math.pow(10, this.randomNumber(1, this.maxDigits));
            const num1: number = Math.floor((multiplier1 * Math.random()));
            const num2: number = Math.floor((multiplier2 * Math.random()));
            const operator: string = this.operators[this.randomNumber(0, 1)];

            questions.push(QuestionService.getQuestion(i.toString(), num1, num2, operator));
        }

        return questions;
    }

    public randomNumber(min: number, max: number): number
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export default GeneratedQuestionService;