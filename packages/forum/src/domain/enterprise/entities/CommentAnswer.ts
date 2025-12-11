import { Optional, UUIDVO } from "@repo/core";

import { Comment, CommentProps } from "./Comment";

export interface CommentAnswerProps extends CommentProps {
  answerId: UUIDVO;
}

export class CommentAnswer extends Comment<CommentAnswerProps> {
  get answerId() {
    return this.props.answerId;
  }

  static create(
    props: Optional<
      CommentAnswerProps,
      "createdAt" | "updatedAt" | "deletedAt"
    >,
    id?: UUIDVO,
  ) {
    const commentAnswer = new CommentAnswer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
        deletedAt: props.deletedAt ?? new Date(),
      },
      id,
    );

    return commentAnswer;
  }
}
