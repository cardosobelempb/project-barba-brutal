import { AbstractUseCase, Either, ErrorCode, left, NotAllwedError, NotFoundError, right } from "@repo/core";

import { CommentQuestionRepository } from "../../repositories";

export namespace DeleteCommentOnQuestion {
  export interface Request {
    authorId: string;
    commentQuestionId: string;
  }

  export type Response = Either<NotAllwedError | NotFoundError, {}>
}

export class DeleteCommentOnQuestionUseCase extends AbstractUseCase<
  {
    commentQuestionRepository: CommentQuestionRepository;
  },
  DeleteCommentOnQuestion.Response,
  DeleteCommentOnQuestion.Request
> {
  async execute({
    authorId,
    commentQuestionId
  }: DeleteCommentOnQuestion.Request): Promise<DeleteCommentOnQuestion.Response> {
    const { commentQuestionRepository } = this.deps;

    const commentQuestion = await commentQuestionRepository.findById(commentQuestionId);

    if (!commentQuestion) {
      return left(new NotFoundError(ErrorCode.NOT_FOUND));
    }

    if (commentQuestion.authorId.getValue() !== authorId) {
      return left(new NotAllwedError(ErrorCode.NOT_ALLOWED));
    }

    await commentQuestionRepository.delete(commentQuestion);

    return right({});
  }
}
