import { expect } from 'vitest';

import { InMemoryNotificationRepository } from '../../repositories/inMemoryRepository';

import { NotAllwedError, UUIDVO } from '@repo/core';
import { ReadNotificationUseCase } from '../ReadNotification';
import { notificationFactory } from '../factories/notification-factory';

let inMemoryNotificationRepository: InMemoryNotificationRepository;
let sut: ReadNotificationUseCase;

describe('Read Notification Use Case', () => {

  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository();
    sut = new ReadNotificationUseCase({notificationRepository: inMemoryNotificationRepository})
  })

  it('should be able to read a notification', async () => {

    const notification = notificationFactory({})

    await inMemoryNotificationRepository.create(notification);

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
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
      recipientId: UUIDVO.generate(),
      notificationId: notification.id.toString(),
    });
    // Act + Assert
    expect(result.value).toBeInstanceOf(NotAllwedError);
  });
});
