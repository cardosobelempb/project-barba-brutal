import { RepositoryAbstract } from "@repo/core";
import { AnswerAttachment } from "../../enterprise/entities";



export abstract class AnswerAttachmentRepository extends RepositoryAbstract<AnswerAttachment> {
  abstract findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  abstract deleteManyByAnswerId(answerId: string): Promise<void>
}
