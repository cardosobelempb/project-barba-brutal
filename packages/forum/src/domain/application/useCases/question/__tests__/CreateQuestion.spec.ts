import { UUIDVO } from '@repo/core';
import { expect } from 'vitest';

import { InMemoryQuestionRepository } from '../../../repositories/InMemoryRepository';
import { CreateQuestion } from '../CreateQuestion';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: CreateQuestion;

describe('Create Question Use Case', () => {

  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new CreateQuestion(inMemoryQuestionRepository)
  })

  it('should be able to create a question', async () => {

    const result = await sut.execute({
      authorId: UUIDVO.generate(),
      title: 'Nova resposta',
      content: 'Conteúdo da pergunta',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionRepository.items[0]).toEqual(result.value?.question);
  })
});
