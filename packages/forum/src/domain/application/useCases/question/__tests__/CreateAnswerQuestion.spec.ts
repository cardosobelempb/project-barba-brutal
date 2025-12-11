import { expect } from 'vitest';


import { InMemoryAnswerRepository } from '../../../repositories/InMemoryRepository';
import { CreateAnswerQuestion } from '../../answer';
import { answerFactory } from '../../answer/factories/answer-factory';

let inMemoryAnswerInRepository: InMemoryAnswerRepository;
let sut: CreateAnswerQuestion;

describe('Answer Question Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerInRepository = new InMemoryAnswerRepository();
    sut = new CreateAnswerQuestion(inMemoryAnswerInRepository)
  })

  it('should be able to create an answer', async () => {

    sut = new CreateAnswerQuestion(inMemoryAnswerInRepository)
    const entity = answerFactory()
    await inMemoryAnswerInRepository.create(entity);

    expect(entity.id).toBeDefined();
    expect(entity.content).toEqual(entity.content);
    expect(inMemoryAnswerInRepository.items[0]?.id.getValue()).toEqual(entity.id.getValue());
  })
})
