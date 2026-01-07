import { AbstractUseCase, Either, right, UUIDVO } from "@repo/core";

import { Notification } from "../../enterprise";
import { NotificationRepository } from "../repositories";

export namespace SendNotification {
  export interface Input {
    recipientId: string;
    title: string;
    content: string;
  }

  export type Output = Either<null, {
    notification: Notification
  }>
}

export class SendNotificationUseCase extends AbstractUseCase<{notificationRepository: NotificationRepository}, SendNotification.Output, SendNotification.Input> {

  async execute({ recipientId, title, content }: SendNotification.Input): Promise<SendNotification.Output>{
    const {notificationRepository } = this.deps;

    const notification = Notification.create({
      recipientId: UUIDVO.create(recipientId),
      title,
      content
    });

    await notificationRepository.create(notification);

    return right({
      notification
    })
  }
}


