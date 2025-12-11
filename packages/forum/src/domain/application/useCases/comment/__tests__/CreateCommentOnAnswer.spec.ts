import { UUIDVO } from '@repo/core';
import { expect } from 'vitest';

import { InMemoryAnswerRepository, InMemoryCommentAnswerRepository } from '../../../repositories/InMemoryRepository';
import { answerFactory } from '../../answer/factories/answer-factory';
import { CreateCommentOnAnswerUseCase } from '../CreateCommentOnAnswer';

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let inMemoryCommentAnswerRepository: InMemoryCommentAnswerRepository;
let sut: CreateCommentOnAnswerUseCase;

describe('Create Comment On Answer Use Case', () => {

  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    inMemoryCommentAnswerRepository = new InMemoryCommentAnswerRepository(),

    sut = new CreateCommentOnAnswerUseCase({
      answerRepository: inMemoryAnswerRepository,
      commentAnswerRepository: inMemoryCommentAnswerRepository,
    })
  })

  it('should be able to create a comment and answer', async () => {

    const answer = answerFactory();

    await inMemoryAnswerRepository.create(answer);

    const { commentAnswer } = await sut.execute({
      authorId: UUIDVO.generate(),
      answerId: answer.id.getValue(),
      content: answer.content,
    });

    expect(commentAnswer.id).toBeDefined();
    expect(inMemoryCommentAnswerRepository.items[0]?.content).toEqual(commentAnswer.content)
  })
});
