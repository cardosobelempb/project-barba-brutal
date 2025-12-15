import { AbstractUseCase, Either, ErrorCode, left, NotAllwedError, NotFoundError, right } from "@repo/core";

import { QuestionRepository } from "../../repositories";

export interface DeleteQuestionRequest {
  authorId: string;
  questionId: string;
}

export type DeleteQuestionResponse = Either<NotFoundError | NotAllwedError, {}>

export class DeleteQuestion extends AbstractUseCase<
  QuestionRepository,
  DeleteQuestionResponse,
  DeleteQuestionRequest
> {
  constructor(private readonly questionRepository: QuestionRepository) {
    super(questionRepository);
  }

  async execute({
    authorId,
    questionId
  }: DeleteQuestionRequest): Promise<DeleteQuestionResponse> {

    const question = await this.questionRepository.findById(questionId);

    if (!question) {
      return left(new NotFoundError(ErrorCode.NOT_FOUND))
    }

    if (question.authorId.getValue() !== authorId) {
      return left(new NotAllwedError(ErrorCode.NOT_ALLOWED))
    }

    await this.questionRepository.delete(question);

    return right({});
  }
}
