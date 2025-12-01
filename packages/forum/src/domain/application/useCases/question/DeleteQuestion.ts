import { AbstractUseCase, BadRequestError, NotAllwedError } from "@repo/core";

import { QuestionRepository } from "../../repositories";

export interface DeleteQuestionRequest {
  authorId: string;
  questionId: string;
}

export interface DeleteQuestionResponse {}

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
      throw new BadRequestError("Question not found.")
    }

    if (question.authorId.getValue() !== authorId) {
      throw new NotAllwedError("Not Allowed.")
    }

    await this.questionRepository.delete(question);

    return {};
  }
}
