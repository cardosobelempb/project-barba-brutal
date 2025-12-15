import { AbstractUseCase, Either, ErrorCode, left, NotFoundError, right, UUIDVO } from "@repo/core";

import { CommentAnswer } from "../../../enterprise";
import { AnswerRepository, CommentAnswerRepository } from "../../repositories";

export namespace CreateCommentOnAnswer {
  export interface Request {
    authorId: string;
    answerId: string;
    content: string;
  }

  export type Response = Either<NotFoundError, {
    commentAnswer: CommentAnswer;
  }>
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
      return left(new NotFoundError(ErrorCode.NOT_FOUND))
    }

    const commentAnswer = CommentAnswer.create({
      authorId: UUIDVO.create(authorId),
      answerId: UUIDVO.create(answerId),
      content,
    })

    await commentAnswerRepository.create(commentAnswer);

    return right({
      commentAnswer,
    });
  }
}
