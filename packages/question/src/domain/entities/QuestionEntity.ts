import { Entity, Optional, SlugVO, UUIDVO } from '@repo/core';

export interface QuestionProps {
  authorId: string;
  bestAnswerId?: UUIDVO;
  title: string;
  slug: SlugVO;
  content: string;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}


export class QuestionEntity extends Entity<QuestionProps> {
  get title() {
    return this.props.title;
  }

  get slug() {
    return this.props.slug;
  }

  get content() {
    return this.props.content;
  }

  static create(
     props: Optional<QuestionProps, 'createdAt' | 'updatedAt' | 'deletedAt'>,
    id?: UUIDVO,
  ) {
    const Question = new QuestionEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return Question
  }
}
