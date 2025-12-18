import { RepositoryAbstract } from "@repo/core";

import { QuestionAttachment } from "../../enterprise/entities";

export abstract class QuestionAttachmentRepository extends RepositoryAbstract<QuestionAttachment> {
  abstract findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
  abstract deleteManyByQuestionId(questionId: string): Promise<void>
}
