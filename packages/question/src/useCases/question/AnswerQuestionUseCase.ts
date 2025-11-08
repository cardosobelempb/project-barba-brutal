import { AnswerEntity } from "../../domain/entities/AnswerEnity";

export interface AnswerQuestionRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  execute({ instructorId, questionId, content }: AnswerQuestionRequest) {

    const answer = new AnswerEntity({
      content,
      authorId: instructorId,
      questionId
    })

    return answer
  }
}
