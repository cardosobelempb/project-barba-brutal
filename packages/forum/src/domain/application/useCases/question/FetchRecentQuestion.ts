import { AbstractUseCase, Either, right } from "@repo/core";

import { Question } from "../../../enterprise";
import { QuestionRepository } from "../../repositories";

export interface FetchRecentQuestionRequest {
  page: number;
}

export type FetchRecentQuestionResponse = Either<null, {
  questions: Question[]
}>

export class FetchRecentQuestion extends AbstractUseCase<{questionRepository: QuestionRepository}, FetchRecentQuestionResponse, FetchRecentQuestionRequest> {

  async execute({ page }: FetchRecentQuestionRequest): Promise<FetchRecentQuestionResponse>{
    const { questionRepository } = this.deps;

    const questions = await questionRepository.findManyRecent({page});

    return right({
      questions
    })
  }
}
