import { Optional, UUIDVO } from "@repo/core";

import { Comment, CommentProps } from "./Comment";

export interface QuestionCommentProps extends CommentProps {

}

export class QuestionComment extends Comment<QuestionCommentProps>{

   static create(
     props: Optional<QuestionCommentProps, 'createdAt' | 'updatedAt' | 'deletedAt'>,
    id?: UUIDVO,
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
        deletedAt: props.deletedAt ?? new Date(),
      },
      id,
    )

    return questionComment
  }
}
