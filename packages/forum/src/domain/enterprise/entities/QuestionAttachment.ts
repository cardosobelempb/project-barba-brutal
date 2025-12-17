import { Entity, UUIDVO } from "@repo/core";

export interface QuestionAttachmentProps {
  questionId: UUIDVO;
  attachmentId: UUIDVO;
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
  get questionId() {
    return this.props.questionId;
  }

  get attachmentId() {
    return this.props.attachmentId;
  }

  static create(props: QuestionAttachmentProps, id?: UUIDVO) {
      const questionAttachment = new QuestionAttachment(props, id);
      return questionAttachment;
    }
}
