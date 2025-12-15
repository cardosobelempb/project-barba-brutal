import { AbstractUseCase, Either, ErrorCode, left, NotFoundError, right, SlugVO } from "@repo/core";

import { Question } from "../../../enterprise";
import { QuestionRepository } from "../../repositories";

export namespace GetQuestionBySlug {
  export interface Request {
    slug: SlugVO;
  }

  export type Response = Either<NotFoundError, {
    question: Question
  }>
}

export class GetQuestionBySlug extends AbstractUseCase<
  {questionRepository: QuestionRepository},
  GetQuestionBySlug.Response,
  GetQuestionBySlug.Request> {

  async execute({ slug }: GetQuestionBySlug.Request): Promise<GetQuestionBySlug.Response>{

    const { questionRepository } = this.deps;

    const question = await questionRepository.findBySlug(slug.getValue());

    if(!question){
      return left(new NotFoundError(ErrorCode.NOT_FOUND))
    }

    return right({
      question
    })
  }
}
