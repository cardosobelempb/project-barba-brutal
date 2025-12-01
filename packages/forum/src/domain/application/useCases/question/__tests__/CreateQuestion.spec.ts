import { UUIDVO } from '@repo/core';
import { expect } from 'vitest';

import { InMemoryQuestionRepository } from '../../../repositories';
import { CreateQuestion } from '../CreateQuestion';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: CreateQuestion;

describe('Create Question Use Case', () => {

  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new CreateQuestion(inMemoryQuestionRepository)
  })

  it('should be able to create a question', async () => {

    const { question } = await sut.execute({
      authorId: UUIDVO.generate(),
      title: 'Nova resposta',
      content: 'Conteúdo da pergunta',
    });

    expect(question.id).toBeDefined();
    expect(question.content).toEqual('Conteúdo da pergunta');
    expect(inMemoryQuestionRepository.items[0]?.id.getValue()).toEqual(question.id.getValue());
  })
});
