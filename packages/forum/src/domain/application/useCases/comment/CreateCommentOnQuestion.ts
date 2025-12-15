import { AbstractUseCase, Either, ErrorCode, left, NotFoundError, right, UUIDVO } from "@repo/core";

import { CommentQuestion } from "../../../enterprise";
import { CommentQuestionRepository, QuestionRepository } from "../../repositories";

export namespace CreateCommentOnCrestion {
  export interface Request {
    authorId: string;
    questionId: string;
    content: string;
  }

  export type Response = Either<NotFoundError, {
    commentQuestion: CommentQuestion;
  }>
}

export class CreateCommentOnQuestionUseCase extends AbstractUseCase<
  {
    questionRepository: QuestionRepository;
    commentQuestionRepository: CommentQuestionRepository;
  },
  CreateCommentOnCrestion.Response,
  CreateCommentOnCrestion.Request
> {
  async execute({
    authorId,
    questionId,
    content,
  }: CreateCommentOnCrestion.Request): Promise<CreateCommentOnCrestion.Response> {
    const { commentQuestionRepository, questionRepository } = this.deps;

    const question = await questionRepository.findById(questionId);

    if (!question) {
      return left(new NotFoundError(ErrorCode.NOT_FOUND))
    }

    const commentQuestion = CommentQuestion.create({
      authorId: UUIDVO.create(authorId),
      questionId: UUIDVO.create(questionId),
      content,
    })

    await commentQuestionRepository.create(commentQuestion);

    return right({
      commentQuestion,
    });
  }
}
