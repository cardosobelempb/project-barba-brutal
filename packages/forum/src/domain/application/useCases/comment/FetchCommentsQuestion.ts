import { AbstractUseCase, Either, right } from "@repo/core";

import { CommentQuestion } from "../../../enterprise";
import { CommentQuestionRepository } from "../../repositories";

export namespace FetchCommentsQuestion {
  export interface Request {
    questionId: string;
    page: number;
  }

  export type Response = Either<null, {
    commentsQuestion: CommentQuestion[]
  }>

}

export class FetchCommentsQuestionUseCase extends AbstractUseCase<{commentQuestionRepository: CommentQuestionRepository}, FetchCommentsQuestion.Response, FetchCommentsQuestion.Request> {

  async execute({ questionId, page  }: FetchCommentsQuestion.Request): Promise<FetchCommentsQuestion.Response>{
    const { commentQuestionRepository } = this.deps;

    const commentsQuestion = await commentQuestionRepository.findManyByCommentQuestionId(questionId, {page});

    return right({
      commentsQuestion
    });
  }
}
