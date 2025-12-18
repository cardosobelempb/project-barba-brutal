import { UUIDVO } from '@repo/core';
import { expect } from 'vitest';

import { InMemoryQuestionRepository } from '../../../repositories/InMemoryRepository';
import { InMemoryQuestionAttachmentRepository } from '../../../repositories/InMemoryRepository/InMemoryQuestionAttachmentRepository';
import { CreateQuestion } from '../CreateQuestion';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository;
let sut: CreateQuestion;

describe('Create Question Use Case', () => {

  beforeEach(() => {
    inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentRepository();
    inMemoryQuestionRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentRepository);
    sut = new CreateQuestion(inMemoryQuestionRepository)
  })

  it('should be able to create a question', async () => {

    const attachemnt1 = UUIDVO.create();
    const attachemnt2 = UUIDVO.create();

    const result = await sut.execute({
      authorId: UUIDVO.generate(),
      title: 'Nova resposta',
      content: 'Conteúdo da pergunta',
      attachmentsIds: [attachemnt1.getValue(), attachemnt2.getValue()]
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionRepository.items[0]).toEqual(result.value?.question);
    expect(inMemoryQuestionRepository.items[0]?.attachments.getItems()).toHaveLength(2);
    expect(inMemoryQuestionRepository.items[0]?.attachments.getItems()[0]?.attachmentId.getValue()).toEqual(attachemnt1.getValue());
    expect(inMemoryQuestionRepository.items[0]?.attachments.getItems()).toEqual([
      expect.objectContaining({attachmentId: attachemnt1}),
      expect.objectContaining({attachmentId: attachemnt2}),
    ]);
  })
});
