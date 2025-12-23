import { faker } from "@faker-js/faker";
import { UUIDVO } from "@repo/core";
import { Notification, NotificationProps } from "../../../enterprise";



export function notificationFactory(
  override: Partial<NotificationProps> = {},
  id?: UUIDVO,
) {
  const notification = Notification.create(
    {
      recipientId: UUIDVO.create(),
      title: faker.lorem.text(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );

  return notification;
}
