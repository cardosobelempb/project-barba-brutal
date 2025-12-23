import { AbstractUseCase, Either, ErrorCode, left, NotAllwedError, NotFoundError, right } from "@repo/core";
import { Notification } from "../../enterprise";
import { NotificationRepository } from "../repositories";



export namespace ReadNotificationProps {
  export interface Input {
  recipientId: string;
  notificationId: string;
}

export type Output = Either<NotFoundError | NotAllwedError, {
  notification: Notification
}>
 }

export class ReadNotificationUseCase extends AbstractUseCase<{notificationRepository: NotificationRepository}, ReadNotificationProps.Output,ReadNotificationProps.Input> {

  async execute({ recipientId, notificationId }: ReadNotificationProps.Input): Promise<ReadNotificationProps.Output>{
    const { notificationRepository } = this.deps;

    const notification = await notificationRepository.findById(notificationId);

    if (!notification) {
      return left(new NotFoundError(ErrorCode.NOT_FOUND))
    }

    if (notification.recipientId.getValue() !== recipientId) {
      return left(new NotAllwedError(ErrorCode.NOT_ALLOWED))
    }

    notification.updateRead();

    await notificationRepository.update(notification);

    return right({
      notification
    })
  }
}
