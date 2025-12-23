import { AbstractUseCase, Either, right, UUIDVO } from "@repo/core";
import { Notification } from "../../enterprise";
import { NotificationRepository } from "../repositories";



export namespace SendNotificationProps {
  export interface Input {
  recipientId: string;
  title: string;
  content: string;
}

export type Output = Either<null, {
  notification: Notification
}>
 }

export class SendNotificationUseCase extends AbstractUseCase<{notificationRepository: NotificationRepository}, SendNotificationProps.Output,SendNotificationProps.Input> {

  async execute({ recipientId, title, content }: SendNotificationProps.Input): Promise<SendNotificationProps.Output>{
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
