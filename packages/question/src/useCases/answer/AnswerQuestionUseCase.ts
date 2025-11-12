import { AnswerEntity } from "../../domain/entities/AnswerEnity";
import { AnswerRepository } from "../../domain/repositories/AnswerRepository";

export interface AnswerQuestionRequest {
  authorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private readonly answerRepository: AnswerRepository){}
  async execute({ authorId, questionId, content }: AnswerQuestionRequest) {

    const answer = new AnswerEntity({
      content,
      authorId,
      questionId
    })

    await this.answerRepository.create(answer)

    return answer
  }
}
