import { Optional, UUIDVO } from "@repo/core";

import { Comment, CommentProps } from "./Comment";

export interface CommentQuestionProps extends CommentProps {
  questionId: UUIDVO;
}

export class CommentQuestion extends Comment<CommentQuestionProps> {
  get questionId() {
    return this.props.questionId;
  }

  static create(
    props: Optional<
      CommentQuestionProps,
      "createdAt" | "updatedAt" | "deletedAt"
    >,
    id?: UUIDVO,
  ) {
    const commentQuestion = new CommentQuestion(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
        deletedAt: props.deletedAt ?? new Date(),
      },
      id,
    );

    return commentQuestion;
  }
}
