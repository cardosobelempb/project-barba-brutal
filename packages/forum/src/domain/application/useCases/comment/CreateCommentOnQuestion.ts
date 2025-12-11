import { AbstractUseCase, NotFoundError, UUIDVO } from "@repo/core";

import { CommentQuestion } from "../../../enterprise";
import { CommentQuestionRepository, QuestionRepository } from "../../repositories";

export namespace CreateCommentOnCrestion {
  export interface Request {
    authorId: string;
    questionId: string;
    content: string;
  }

  export interface Response {
    commentQuestion: CommentQuestion;
  }
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
      throw new NotFoundError("Question not found.")
    }

    const commentQuestion = CommentQuestion.create({
      authorId: UUIDVO.create(authorId),
      questionId: UUIDVO.create(questionId),
      content,
    })

    await commentQuestionRepository.create(commentQuestion);

    return {
      commentQuestion,
    };
  }
}
