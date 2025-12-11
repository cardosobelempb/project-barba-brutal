import { AbstractUseCase, NotAllwedError, NotFoundError } from "@repo/core";

import { CommentQuestionRepository } from "../../repositories";

export namespace DeleteCommentOnQuestion {
  export interface Request {
    authorId: string;
    commentQuestionId: string;
  }

  export interface Response {}
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
      throw new NotFoundError("Comment Question not found.")
    }

    if (commentQuestion.authorId.getValue() !== authorId) {
      throw new NotAllwedError("Not allowed.")
    }

    await commentQuestionRepository.delete(commentQuestion);

    return {};
  }
}
