import { UUIDVO } from '@repo/core';

export interface QuestionProps {
  id: UUIDVO
  title: string, content: string, authorId: string
}


export class QuestionEntity {
  public id?: UUIDVO
  public title: string;
  public content: string;
  public authorId: string;

  constructor(props: QuestionProps, id?: UUIDVO) {
    this.id = id ?? new UUIDVO(id);
    this.title = props.title;
    this.content = props.content;
    this.authorId = props.authorId;
  }
}
