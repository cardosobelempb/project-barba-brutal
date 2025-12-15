import { AbstractUseCase, Either, right, UUIDVO } from "@repo/core";

import { Question } from "../../../enterprise";
import { QuestionRepository } from "../../repositories";

export interface CreateQuestionRequest {
  authorId: string;
  title: string;
  content: string;
}

export type CreateQuestionResponse = Either<null, {
  question: Question
}>

export class CreateQuestion extends AbstractUseCase<QuestionRepository, CreateQuestionResponse,CreateQuestionRequest> {
  constructor(private readonly questionRepository: QuestionRepository) {
    super(questionRepository);
  }

  async execute({ authorId, title, content }: CreateQuestionRequest): Promise<CreateQuestionResponse>{

    const question = Question.create({
      authorId: UUIDVO.create(authorId),
      title,
      content
    })

    await this.questionRepository.create(question);

    return right({
      question
    })
  }
}
