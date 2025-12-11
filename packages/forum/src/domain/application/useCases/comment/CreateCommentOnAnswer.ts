import { AbstractUseCase, NotFoundError, UUIDVO } from "@repo/core";

import { CommentAnswer } from "../../../enterprise";
import { AnswerRepository, CommentAnswerRepository } from "../../repositories";

export namespace CreateCommentOnAnswer {
  export interface Request {
    authorId: string;
    answerId: string;
    content: string;
  }

  export interface Response {
    commentAnswer: CommentAnswer;
  }
}

export class CreateCommentOnAnswerUseCase extends AbstractUseCase<
  {
    answerRepository: AnswerRepository;
    commentAnswerRepository: CommentAnswerRepository;
  },
  CreateCommentOnAnswer.Response,
  CreateCommentOnAnswer.Request
> {
  async execute({
    authorId,
    answerId,
    content,
  }: CreateCommentOnAnswer.Request): Promise<CreateCommentOnAnswer.Response> {
    const { commentAnswerRepository, answerRepository } = this.deps;

    const answer = await answerRepository.findById(answerId);

    if (!answer) {
      throw new NotFoundError("Answer not found.")
    }

    const commentAnswer = CommentAnswer.create({
      authorId: UUIDVO.create(authorId),
      answerId: UUIDVO.create(answerId),
      content,
    })

    await commentAnswerRepository.create(commentAnswer);

    return {
      commentAnswer,
    };
  }
}
