import { UUIDVO } from '@repo/core';
import { expect } from 'vitest';

import { InMemoryAnswerInRepository } from '../../../repositories';
import { CreateAnswerQuestion } from '../CreateAnswerQuestion';


let inMemoryAnswerInRepository: InMemoryAnswerInRepository;
let sut: CreateAnswerQuestion;

describe('Answer Question Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerInRepository = new InMemoryAnswerInRepository();
    sut = new CreateAnswerQuestion(inMemoryAnswerInRepository)
  })

  it('should be able to create an answer', async () => {

    sut = new CreateAnswerQuestion(inMemoryAnswerInRepository)
    const {answer} = await sut.execute({
      questionId:  UUIDVO.generate(),
      intructorId:   UUIDVO.generate(),
      content: 'Nova resposta',
    })

    expect(answer.id).toBeDefined();
    expect(answer.content).toEqual('Nova resposta');
    expect(inMemoryAnswerInRepository.items[0]?.id.getValue()).toEqual(answer.id.getValue());
  })
})
