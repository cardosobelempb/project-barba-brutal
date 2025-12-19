import { AbstractUseCase, Either, right, UUIDVO } from "@repo/core";

import { Answer, AnswerAttachment, AnswerAttachmentList } from "../../../enterprise/entities";
import { AnswerRepository } from "../../repositories";

export interface AnswerQuestionRequest {
  intructorId: string;
  questionId: string;
  content: string;
  attachmentsIds: string[];
}

export type AnswerQuestionResponse = Either<null, {
  answer: Answer;
}>

export class CreateAnswerQuestion extends AbstractUseCase<{
  answerRepository: AnswerRepository
}, AnswerQuestionResponse, AnswerQuestionRequest> {

  async execute({ intructorId, questionId, content, attachmentsIds }: AnswerQuestionRequest): Promise<AnswerQuestionResponse> {
    const { answerRepository } = this.deps;

    const answer = Answer.create({
      authorId: UUIDVO.create(intructorId),
      questionId: UUIDVO.create(questionId),
      content
    });

    const answerAttachments = attachmentsIds.map(attachmentId => {
      return AnswerAttachment.create({
        attachmentId: UUIDVO.create(attachmentId),
        answerId: answer.id,
      })
    })

    answer.updateAttachments(new AnswerAttachmentList(answerAttachments));

    await answerRepository.create(answer)

    return right({
      answer,
    })
  }
}
