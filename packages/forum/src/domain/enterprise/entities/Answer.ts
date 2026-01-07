import { AggregateAbstract, Optional, StringUtils, UUIDVO } from '@repo/core';

import { AnswerCreatedEvent } from '../events';
import { AnswerAttachmentList } from './AnswerAttachementList';

export interface AnswerProps {
  authorId: UUIDVO;
  questionId: UUIDVO;
  content: string;
  attachments: AnswerAttachmentList;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export class Answer extends AggregateAbstract<AnswerProps> {

  get content() {
    return this.props.content;
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  get attachments() {
    return this.props.attachments;
  }

  get authorId() {
    return this.props.authorId;
  }

  get questionId() {
    return this.props.questionId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get deletedAt() {
    return this.props.deletedAt;
  }

  get excerpt() {
    return StringUtils.truncate(this.content, 120)
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  updateAttachments(attachments: AnswerAttachmentList) {
    this.props.attachments = attachments;
    this.touch();
  }


  static create(
     props: Optional<AnswerProps, "attachments" | 'createdAt' | 'updatedAt' | 'deletedAt'>,
    id?: UUIDVO,
  ) {
    const answer = new Answer(
      {
        ...props,
        attachments: props.attachments ?? new AnswerAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    const isNewAnswer = !id;

    if(isNewAnswer) {
      answer.registerEvent(new AnswerCreatedEvent(answer));
    }

    return answer;
  }
}
