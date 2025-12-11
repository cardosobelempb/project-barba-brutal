import { AbstractUseCase } from "@repo/core";

import { CommentAnswer } from "../../../enterprise";
import { CommentAnswerRepository } from "../../repositories";

export namespace FetchCommentsAnswer {
  export interface Request {
    answerId: string;
    page: number;
  }

  export interface Response {
    commentsAnswer: CommentAnswer[]
  }

}

export class FetchCommentsAnswerUseCase extends AbstractUseCase<{commentAnswerRepository: CommentAnswerRepository}, FetchCommentsAnswer.Response, FetchCommentsAnswer.Request> {

  async execute({ answerId, page  }: FetchCommentsAnswer.Request): Promise<FetchCommentsAnswer.Response>{
    const { commentAnswerRepository } = this.deps;

    const commentsAnswer = await commentAnswerRepository.findManyByCommentAnswerId(answerId, {page});

    return {
      commentsAnswer
    }
  }
}
