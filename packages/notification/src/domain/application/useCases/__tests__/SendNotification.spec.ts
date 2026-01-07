import { UUIDVO } from '@repo/core';
import { expect } from 'vitest';

import { InMemoryNotificationRepository } from '../../repositories/inMemoryRepository';
import { notificationFactory } from '../factories/notification-factory';
import { SendNotificationUseCase } from '../SendNotification';

let inMemoryNotificationRepository: InMemoryNotificationRepository;
let sut: SendNotificationUseCase;

describe('Send Notification Use Case', () => {

  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository();
    sut = new SendNotificationUseCase({notificationRepository: inMemoryNotificationRepository})
  })

  it('should be able to send a notification', async () => {

    const factory = notificationFactory({})

    const result = await sut.execute({
      recipientId: UUIDVO.generate(),
      title: factory.title,
      content: factory.content,
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationRepository.items[0]).toEqual(result.value?.notification);
  })
});
