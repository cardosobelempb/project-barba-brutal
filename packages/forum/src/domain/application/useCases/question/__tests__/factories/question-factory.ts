import { faker } from "@faker-js/faker";
import { UUIDVO } from "@repo/core";

import { Question, QuestionProps } from "../../../../../enterprise";

export function questionFactory(
  override: Partial<QuestionProps> = {},
  id?: UUIDVO,
) {
  const question = Question.create(
    {
      authorId: UUIDVO.create(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );

  return question;
}
