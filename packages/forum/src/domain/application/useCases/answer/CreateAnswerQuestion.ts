import { AbstractUseCase, UUIDVO } from "@repo/core";

import { Answer } from "../../../enterprise/entities";
import { AnswerRepository } from "../../repositories";

export interface AnswerQuestionRequest {
  intructorId: string;
  questionId: string;
  content: string;
}

export interface AnswerQuestionResponse {
  answer: Answer;
}

export class CreateAnswerQuestion extends AbstractUseCase<AnswerRepository, AnswerQuestionResponse, AnswerQuestionRequest> {
  constructor(private readonly answerRepository: AnswerRepository) {
    super(answerRepository)
   }

  async execute({ intructorId, questionId, content }: AnswerQuestionRequest): Promise<AnswerQuestionResponse> {

    const answer = Answer.create({
      authorId: UUIDVO.create(intructorId),
      questionId: UUIDVO.create(questionId),
      content
    })

    await this.answerRepository.create(answer)

    return {
      answer,
    }
  }
}
