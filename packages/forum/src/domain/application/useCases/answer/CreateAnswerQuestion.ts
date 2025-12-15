import { AbstractUseCase, Either, right, UUIDVO } from "@repo/core";

import { Answer } from "../../../enterprise/entities";
import { AnswerRepository } from "../../repositories";

export interface AnswerQuestionRequest {
  intructorId: string;
  questionId: string;
  content: string;
}

export type AnswerQuestionResponse = Either<null, {
  answer: Answer;
}>

export class CreateAnswerQuestion extends AbstractUseCase<{
  answerRepository: AnswerRepository
}, AnswerQuestionResponse, AnswerQuestionRequest> {

  async execute({ intructorId, questionId, content }: AnswerQuestionRequest): Promise<AnswerQuestionResponse> {
    const {answerRepository } = this.deps;
    const answer = Answer.create({
      authorId: UUIDVO.create(intructorId),
      questionId: UUIDVO.create(questionId),
      content
    })

    await answerRepository.create(answer)

    return right({
      answer,
    })
  }
}
