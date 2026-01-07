import { EventAbstract, UUIDVO } from "@repo/core";

import { Answer } from "../entities";

export class AnswerCreatedEvent implements EventAbstract {
  occurredAt: Date;
  answer: Answer;

  constructor(answer: Answer) {
    this.answer = answer;
    this.occurredAt = new Date();
  }

  getAggregateId(): UUIDVO {
    return this.answer.id;
  }
}
