import { AbstractUseCase } from "@repo/core";

import { Question } from "../../../enterprise";
import { QuestionRepository } from "../../repositories";

export interface FetchRecentQuestionRequest {
  page: number;
}

export interface FetchRecentQuestionResponse {
  questions: Question[]
}

export class FetchRecentQuestion extends AbstractUseCase<{questionRepository: QuestionRepository}, FetchRecentQuestionResponse, FetchRecentQuestionRequest> {

  async execute({ page }: FetchRecentQuestionRequest): Promise<FetchRecentQuestionResponse>{
    const { questionRepository } = this.deps;

    const questions = await questionRepository.findManyRecent({page});

    return {
      questions
    }
  }
}
