import { faker } from "@faker-js/faker";
import { UUIDVO } from "@repo/core";

import { Question, QuestionProps } from "../../../../../enterprise";

export function questionFactory(
  override: Partial<QuestionProps> = {},
  id?: UUIDVO,
) {
  const question = Question.create(
    {
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      authorId: UUIDVO.create(),
      ...override,
    },
    id,
  );

  return question;
}
