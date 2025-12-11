import { AbstractUseCase, NotAllwedError, NotFoundError } from "@repo/core";

import { CommentAnswerRepository } from "../../repositories";

export namespace DeleteCommentOnAnswer {
  export interface Request {
    authorId: string;
    commentAnswerId: string;
  }

  export interface Response {}
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
      throw new NotFoundError("Comment Answer not found.")
    }

    if (commentAnswer.authorId.getValue() !== authorId) {
      throw new NotAllwedError("Not allowed.")
    }

    await commentAnswerRepository.delete(commentAnswer);

    return {};
  }
}
