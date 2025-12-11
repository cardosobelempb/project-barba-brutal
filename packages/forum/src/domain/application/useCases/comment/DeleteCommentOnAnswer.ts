import { AbstractUseCase, Either, left, right } from "@repo/core";

import { CommentAnswerRepository } from "../../repositories";

export namespace DeleteCommentOnAnswer {
  export interface Request {
    authorId: string;
    commentAnswerId: string;
  }

  export type Response = Either<string, {}>
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
      return left("Comment Answer not found.");
    }

    if (commentAnswer.authorId.getValue() !== authorId) {
      return left("Not allowed.");
    }

    await commentAnswerRepository.delete(commentAnswer);

    return right({});
  }
}
