import { Entity, UUIDVO } from "@repo/core";

export interface CommentProps {
  authorId: UUIDVO;
  content: string;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export abstract class Comment<Props extends CommentProps> extends Entity<Props>{
  get authorId() {
    return this.props.authorId;
  }
  get content() {
    return this.props.content;
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

  updatedAuthorId(authorId: UUIDVO) {
    this.props.authorId = authorId;
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

}
