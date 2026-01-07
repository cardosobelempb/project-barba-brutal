import { NotAllwedError, UUIDVO } from '@repo/core';
import { expect } from 'vitest';

import { InMemoryNotificationRepository } from '../../repositories/inMemoryRepository';
import { notificationFactory } from '../factories/notification-factory';
import { ReadNotification } from '../ReadNotification';

let inMemoryNotificationRepository: InMemoryNotificationRepository;
let sut: ReadNotification.UseCase;

describe('Read Notification Use Case', () => {

  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository();
    sut = new ReadNotification.UseCase({notificationRepository: inMemoryNotificationRepository})
  })

  it('should be able to read a notification', async () => {

    const notification = notificationFactory({})

    await inMemoryNotificationRepository.create(notification);

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: notification.recipientId.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationRepository.items[0]?.readAt).toEqual(
      expect.any(Date)
    );
  })

  it("should not be able to read a notification from another user", async () => {

    const notification = notificationFactory({})

    await inMemoryNotificationRepository.create(notification);

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: UUIDVO.generate(),
    });
    // Act + Assert
    expect(result.value).toBeInstanceOf(NotAllwedError);
  });
});
