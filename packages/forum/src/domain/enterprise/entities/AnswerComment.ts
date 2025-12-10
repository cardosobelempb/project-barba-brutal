import { Optional, UUIDVO } from "@repo/core";

import { Comment, CommentProps } from "./Comment";

export interface AnswerCommentProps extends CommentProps {
  answerId: UUIDVO;
  }

export class AnswerComment extends Comment<AnswerCommentProps>{

  get answerId() {
    return this.props.answerId;
  }

  static create(
     props: Optional<AnswerCommentProps, 'createdAt' | 'updatedAt' | 'deletedAt'>,
    id?: UUIDVO,
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
        deletedAt: props.deletedAt ?? new Date(),
      },
      id,
    )

    return answerComment
  }
}
