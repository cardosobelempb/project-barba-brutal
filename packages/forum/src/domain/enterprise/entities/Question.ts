import { AggregateAbstract, DateUtils, Optional, SlugVO, StringUtils, UUIDVO } from '@repo/core';

import { QuestionAttachmentList } from './QuestionAttachementList';

export interface QuestionProps {
  authorId: UUIDVO;
  bestAnswerId?: UUIDVO;
  title: string;
  slug: SlugVO;
  content: string;
  attachments: QuestionAttachmentList;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}


export class Question extends AggregateAbstract<QuestionProps> {

  get authorId() {
    return this.props.authorId;
  }

  get bestAnswerId() {
    return this.props.bestAnswerId;
  }

  set bestAnswerId(bestAnswerId: UUIDVO | undefined) {
    this.props.bestAnswerId = bestAnswerId
  }

  get title() {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
    this.props.slug = SlugVO.createFromText(title);

    this.touch();
  }

  get slug() {
    return this.props.slug;
  }

  get content() {
    return this.props.content;
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  get isNew(): boolean {
    const currentDate = Date.now();
    return DateUtils.diffInDays(this.createdAt, new Date(currentDate)) <= 3;
  }

  get attachments() {
    return this.props.attachments;
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

  updateAttachments(attachments: QuestionAttachmentList) {
    this.props.attachments = attachments;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
     props: Optional<QuestionProps, 'slug' | 'attachments' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
    id?: UUIDVO,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? SlugVO.createFromText(props.title),
        attachments: props.attachments ?? new QuestionAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return question
  }
}
