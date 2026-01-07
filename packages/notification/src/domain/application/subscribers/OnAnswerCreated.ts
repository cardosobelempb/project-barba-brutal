import { EventHandlerAbstract, Events } from "@repo/core";
import { AnswerCreatedEvent, QuestionRepository } from "@repo/forum";

import { SendNotificationUseCase } from "../useCases";

export class OnAnswerCreated implements EventHandlerAbstract {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    Events.register(
      AnswerCreatedEvent.name,
      this.sendNewAnswerNotification.bind(this),
    );
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionRepository.findById(answer.questionId.toString());

    if(question) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        title: `New Answer Received em "${question?.title.substring(0, 40).concat('...')}"`,
        content: `New answer on your question: ${answer.excerpt}`,
      });
    }

  }
}
