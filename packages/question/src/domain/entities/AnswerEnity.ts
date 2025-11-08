import { UUIDVO } from '@repo/core';

export interface AnswerProps {
  id?: UUIDVO
  content: string;
  authorId: string;
  questionId: string;
}


export class AnswerEntity {
  public id?: UUIDVO
  public content: string;
  public authorId: string;
  public questionId: string;

  constructor(props: AnswerProps, id?: UUIDVO) {
    this.id = id ?? new UUIDVO(id);
    this.content = props.content;
    this.authorId = props.authorId;
    this.questionId = props.questionId;
  }
}
