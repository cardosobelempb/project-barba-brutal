import { UUIDVO } from '@repo/core';

export interface QuestionProps {
  id: UUIDVO;
  title: string;
  slug: string;
  content: string;
  authorId: string;
}


export class QuestionEntity {
  public id?: UUIDVO;
  public title: string;
  public slug: string;
  public content: string;
  public authorId: string;

  constructor(props: QuestionProps, id?: UUIDVO) {
    this.id = id ?? UUIDVO.create(id);
    this.title = props.title;
    this.content = props.content;
    this.slug = props.slug;
    this.authorId = props.authorId;
  }
}
