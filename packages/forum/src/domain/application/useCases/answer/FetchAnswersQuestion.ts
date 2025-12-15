import { AbstractUseCase, Either, right } from "@repo/core";

import { Answer } from "../../../enterprise";
import { AnswerRepository } from "../../repositories";

export namespace FetchAnswersQuestion {
  export interface Request {
    questionId: string;
    page: number;
  }

  export type Response = Either<null, {
    answers: Answer[]
  }>

}

export class FetchAnswersQuestion extends AbstractUseCase<{answerRepository: AnswerRepository}, FetchAnswersQuestion.Response, FetchAnswersQuestion.Request> {

  async execute({ questionId, page  }: FetchAnswersQuestion.Request): Promise<FetchAnswersQuestion.Response>{
    const { answerRepository } = this.deps;

    const answers = await answerRepository.findManyByQuestionId(questionId, {page});

    return right({
      answers
    })
  }
}
