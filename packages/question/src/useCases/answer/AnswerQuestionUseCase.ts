import { UUIDVO } from "@repo/core";
import { AnswerEntity } from "../../domain/entities/AnswerEnity";
import { AnswerRepository } from "../../domain/repositories/AnswerRepository";

export interface AnswerQuestionRequest {
  intructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private readonly answerRepository: AnswerRepository){}
  async execute({ intructorId, questionId, content }: AnswerQuestionRequest) {

    const answer = AnswerEntity.create({
      authorId: UUIDVO.create(intructorId),
      questionId: UUIDVO.create(questionId),
      content
    })

    await this.answerRepository.create(answer)

    return answer
  }
}
