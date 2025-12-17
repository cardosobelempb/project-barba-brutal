import { Entity, UUIDVO } from "@repo/core";

export interface AnswerAttachmentProps {
  answerId: UUIDVO;
  attachmentId: UUIDVO;
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
  get answerId() {
    return this.props.answerId;
  }

  get attachmentId() {
    return this.props.attachmentId;
  }

  static create(props: AnswerAttachmentProps, id?: UUIDVO) {
      const answerAttachment = new AnswerAttachment(props, id);
      return answerAttachment;
    }
}
