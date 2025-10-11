// import type { Operation, Question }                            from "../assets/types";
// import RetrieveQuestionService                      from "./RetrieveQuestionService";

// class ApiRetrieveQuestionService extends RetrieveQuestionService
// {
//     public async getQuestion(selectedOperations: Operation): Promise<Question[] | null> {
        
//         const response: Response = await fetch('/mock-data.json');

//         if (!response.ok)
//         {
//             return null;
//         }
        
//         const rawData: ApiQuestionsResponse = await response.json();
        
//         return rawData.questions;
//     }
// }

// export default ApiRetrieveQuestionService;

// type ApiQuestionsResponse = {
//     questions: Question[]
// }