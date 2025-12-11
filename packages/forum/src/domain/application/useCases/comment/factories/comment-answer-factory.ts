import { faker } from "@faker-js/faker";
import { UUIDVO } from "@repo/core";

import { CommentAnswer, CommentAnswerProps } from "../../../../enterprise";

export function commentAnswerFactory(
  override: Partial<CommentAnswerProps> = {},
  id?: UUIDVO,
) {
  const commentAnswer = CommentAnswer.create(
    {
      authorId: UUIDVO.create(),
      answerId: UUIDVO.create(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );

  return commentAnswer;
}
