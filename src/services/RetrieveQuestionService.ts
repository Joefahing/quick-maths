import type { Question }                        from "../assets/types";

abstract class RetrieveQuestionService
{
    public abstract getQuestion(): Promise<Question[] | null>;
}

export default RetrieveQuestionService;