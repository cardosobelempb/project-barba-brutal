import { Entity, Optional, StringUtils, UUIDVO } from '@repo/core';

export interface AnswerProps {
  authorId: UUIDVO;
  questionId: UUIDVO;
  content: string;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}


export class Answer extends Entity<AnswerProps> {

  get content() {
    return this.props.content;
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
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


  static create(
     props: Optional<AnswerProps, 'createdAt' | 'updatedAt' | 'deletedAt'>,
    id?: UUIDVO,
  ) {
    const answer = new Answer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answer;
  }
}
