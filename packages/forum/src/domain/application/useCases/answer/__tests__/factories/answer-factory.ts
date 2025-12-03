import { faker } from "@faker-js/faker";
import { UUIDVO } from "@repo/core";

import { Answer, AnswerProps } from "../../../../../enterprise";

export function answerFactory(
  override: Partial<AnswerProps> = {},
  id?: UUIDVO,
) {
  const answer = Answer.create(
    {
      authorId: UUIDVO.create(),
      questionId: UUIDVO.create(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );

  return answer;
}
