export enum GameStatus
{
    Ready = 1,
    Playing = 2,
    Finished = 3
};

export interface Question
{
    id: string;
    expression: string;
}

export interface QuestionAnswer
{
    question: Question;
    answer: number;
    isCorrect: boolean;
    time: number;
}