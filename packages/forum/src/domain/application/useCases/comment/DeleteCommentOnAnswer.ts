import { AbstractUseCase, Either, ErrorCode, left, NotAllwedError, NotFoundError, right } from "@repo/core";

import { CommentAnswerRepository } from "../../repositories";

export namespace DeleteCommentOnAnswer {
  export interface Request {
    authorId: string;
    commentAnswerId: string;
  }

  export type Response = Either<NotAllwedError | NotFoundError, {}>
}

export class DeleteCommentOnAnswerUseCase extends AbstractUseCase<
  {
    commentAnswerRepository: CommentAnswerRepository;
  },
  DeleteCommentOnAnswer.Response,
  DeleteCommentOnAnswer.Request
> {
  async execute({
    authorId,
    commentAnswerId
  }: DeleteCommentOnAnswer.Request): Promise<DeleteCommentOnAnswer.Response> {
    const { commentAnswerRepository } = this.deps;

    const commentAnswer = await commentAnswerRepository.findById(commentAnswerId);

    if (!commentAnswer) {
      return left(new NotFoundError(ErrorCode.NOT_FOUND));
    }

    if (commentAnswer.authorId.getValue() !== authorId) {
      return left(new NotAllwedError(ErrorCode.NOT_ALLOWED));
    }

    await commentAnswerRepository.delete(commentAnswer);

    return right({});
  }
}
