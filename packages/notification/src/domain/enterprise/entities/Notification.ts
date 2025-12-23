import { Entity, Optional, UUIDVO } from '@repo/core';


export interface NotificationProps {
  recipientId: UUIDVO;
  title: string;
  content: string;
  readAt: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export class Notification extends Entity<NotificationProps> {

  get title() {
    return this.props.title;
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  get recipientId() {
    return this.props.recipientId;
  }

  get readAt() {
    return this.props.readAt;
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

  updatedTitle(title: string) {
    this.props.title = title;
    this.touch();
  }

  updatedContent(content: string) {
    this.props.content = content;
    this.touch();
  }

  updatedRecipientId(recipientId: UUIDVO) {
    this.props.recipientId = recipientId;
    this.touch();
  }

  updateRead() {
    this.props.readAt = new Date();
    this.touch();
  }

  updatedcontent(content: string) {
    this.props.content = content;
    this.touch();
  }

  softDelete() {
    this.props.deletedAt = new Date();
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }




  static create(
     props: Optional<NotificationProps, 'readAt' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
    id?: UUIDVO,
  ) {
    const notification = new Notification(
      {
        ...props,
        readAt: props.readAt ?? null,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
        deletedAt: props.deletedAt ?? null,
      },
      id,
    )

    return notification;
  }
}
