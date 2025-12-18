import { UUIDVO } from '@repo/core';
import { expect } from 'vitest';

import { InMemoryAnswerRepository } from '../../../repositories/InMemoryRepository';
import { answerFactory } from '../factories/answer-factory';
import { FetchAnswersQuestion } from '../FetchAnswersQuestion';

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: FetchAnswersQuestion;

describe('Feth Answer Question', () => {

  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new FetchAnswersQuestion({answerRepository: inMemoryAnswerRepository})
  })

  it('should be able to fetch answers question', async () => {

    const questionIdVO = UUIDVO.create();

    await inMemoryAnswerRepository.create(answerFactory({questionId: questionIdVO}));
    await inMemoryAnswerRepository.create(answerFactory({questionId: questionIdVO}));
    await inMemoryAnswerRepository.create(answerFactory({questionId: questionIdVO}));

    const { value } = await sut.execute({
      questionId: questionIdVO.getValue(),
      page: 1
    });

    expect(value?.answers).toHaveLength(3);
  })

  it('should be able to fetch paginated  fetch answers question', async () => {

    const questionIdVO = UUIDVO.create();

    for (let i = 1; i <= 22; i++){
      await inMemoryAnswerRepository.create(answerFactory({questionId: questionIdVO}));
    }

    const { value } = await sut.execute({
      questionId: questionIdVO.getValue(),
      page: 2
    });

    expect(value?.answers).toHaveLength(2);
  })

});
