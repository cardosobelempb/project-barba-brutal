import { AbstractUseCase, Either, right, UUIDVO } from "@repo/core";

import { Answer, AnswerAttachment, AnswerAttachmentList } from "../../../enterprise/entities";
import { AnswerRepository } from "../../repositories";

export namespace CreateAnswerQuestion {
  export interface Input {
  intructorId: string;
  questionId: string;
  content: string;
  attachmentsIds: string[];
}

export type Output = Either<null, {
  answer: Answer;
}>
}

export class CreateAnswerQuestion extends AbstractUseCase<{
  answerRepository: AnswerRepository
}, CreateAnswerQuestion.Output, CreateAnswerQuestion.Input> {

  async execute({ intructorId, questionId, content, attachmentsIds }: CreateAnswerQuestion.Input): Promise<CreateAnswerQuestion.Output> {
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

    // console.log(`Answer created with ID: ${answer.id}`);

    return right({
      answer,
    })
  }
}
