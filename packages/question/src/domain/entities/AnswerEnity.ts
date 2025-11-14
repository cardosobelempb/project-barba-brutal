import { Entity, Optional, UUIDVO } from '@repo/core';

export interface AnswerProps {
  id?: UUIDVO
  content: string;
  authorId: string;
  questionId: string;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}


export class AnswerEntity extends Entity<AnswerProps> {

  get content() {
    return this.props.content;
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
