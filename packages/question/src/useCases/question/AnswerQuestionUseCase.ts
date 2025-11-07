import { AnswerEntity } from "../../entities/AnswerEnity";

export interface AnswerQuestionRequest {
  questionId: string;
  instructorId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  execute({ instructorId, questionId, content }: AnswerQuestionRequest) {

    const answer = new AnswerEntity({content, authorId: instructorId, questionId} )

    return answer
  }
}
