import { AbstractUseCase, Either, ErrorCode, left, NotAllwedError, NotFoundError, right } from "@repo/core";

import { Notification } from "../../enterprise";
import { NotificationRepository } from "../repositories";

export namespace ReadNotification {
  export interface Input {
    recipientId: string;
    notificationId: string;
  }

  export type Output = Either<NotFoundError | NotAllwedError, {
    notification: Notification
  }>

  export class UseCase extends AbstractUseCase<{notificationRepository: NotificationRepository}, Output,Input> {

    async execute({ recipientId, notificationId }: Input): Promise<Output>{
      const { notificationRepository } = this.deps;

      const notification = await notificationRepository.findById(notificationId);

      if (!notification) {
        return left(new NotFoundError(ErrorCode.NOT_FOUND))
      }

      if (notification.recipientId.toString() !== recipientId) {
        return left(new NotAllwedError(ErrorCode.NOT_ALLOWED))
      }

      notification.updatedRead();

      await notificationRepository.update(notification);

      return right({
        notification
      })
    }
  }
 }

