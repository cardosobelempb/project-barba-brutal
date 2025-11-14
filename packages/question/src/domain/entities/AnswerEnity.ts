import { Entity, Optional, UUIDVO } from '@repo/core';

export interface AnswerProps {
  authorId: UUIDVO;
  questionId: UUIDVO;
  content: string;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}


export class AnswerEntity extends Entity<AnswerProps> {

  get content() {
    return this.props.content;
  }

  get authorId() {
    return this.props.authorId;
  }

  get questionId() {
    return this.props.questionId;
  }

  static create(
     props: Optional<AnswerProps, 'createdAt' | 'updatedAt' | 'deletedAt'>,
    id?: UUIDVO,
  ) {
    const Answer = new AnswerEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return Answer;
  }
}
