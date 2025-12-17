import { AbstractUseCase, Either, right, UUIDVO } from "@repo/core";

import { Question } from "../../../enterprise";
import { QuestionAttachmentList } from "../../../enterprise/entities/QuestionAttachementList";
import { QuestionAttachment } from "../../../enterprise/entities/QuestionAttachment";
import { QuestionRepository } from "../../repositories";

export interface CreateQuestionRequest {
  authorId: string;
  title: string;
  content: string;
  attachmentsIds: string[];
}

export type CreateQuestionResponse = Either<null, {
  question: Question
}>

export class CreateQuestion extends AbstractUseCase<QuestionRepository, CreateQuestionResponse,CreateQuestionRequest> {
  constructor(private readonly questionRepository: QuestionRepository) {
    super(questionRepository);
  }

  async execute({ authorId, title, content, attachmentsIds }: CreateQuestionRequest): Promise<CreateQuestionResponse>{

    const question = Question.create({
      authorId: UUIDVO.create(authorId),
      title,
      content
    });

    const questionAttachments = attachmentsIds.map(attachmentId => {
      return QuestionAttachment.create({
        attachmentId: UUIDVO.create(attachmentId),
        questionId: question.id,
      })
    })

    question.updateAttachments(new QuestionAttachmentList(questionAttachments));

    await this.questionRepository.create(question);

    return right({
      question
    })
  }
}
