import { AbstractUseCase, NotFoundError, SlugVO } from "@repo/core";

import { Question } from "../../../enterprise";
import { QuestionRepository } from "../../repositories";

export interface GetQuestionBySlugRequest {
  slug: SlugVO;
}

export interface GetQuestionBySlugResponse {
  question: Question
}

export class GetQuestionBySlug extends AbstractUseCase<QuestionRepository, GetQuestionBySlugResponse, GetQuestionBySlugRequest> {
  constructor(private readonly questionRepository: QuestionRepository) {
    super(questionRepository)
   }

  async execute({ slug }: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse>{

    const question = await this.questionRepository.findBySlug(slug.getValue());

    if(!question){
      throw new NotFoundError("Question not found");
    }

    return {
      question
    }
  }
}
