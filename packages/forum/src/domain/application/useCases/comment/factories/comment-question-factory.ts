import { faker } from "@faker-js/faker";
import { UUIDVO } from "@repo/core";

import { CommentQuestion, CommentQuestionProps } from "../../../../enterprise";

export function commentQuestionFactory(
  override: Partial<CommentQuestionProps> = {},
  id?: UUIDVO,
) {
  const commentQuestion = CommentQuestion.create(
    {
      authorId: UUIDVO.create(),
      questionId: UUIDVO.create(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );

  return commentQuestion;
}
