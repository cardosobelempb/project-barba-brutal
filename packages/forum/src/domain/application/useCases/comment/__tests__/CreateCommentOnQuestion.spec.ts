import { UUIDVO } from '@repo/core';
import { expect } from 'vitest';

import { InMemoryCommentQuestionRepository, InMemoryQuestionRepository } from '../../../repositories/InMemoryRepository';
import { questionFactory } from '../../question/factories/question-factory';
import { CreateCommentOnQuestionUseCase } from '../CreateCommentOnQuestion';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let inMemoryCommentQuestionRepository: InMemoryCommentQuestionRepository;
let sut: CreateCommentOnQuestionUseCase;

describe('Create Comment On Question Use Case', () => {

  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    inMemoryCommentQuestionRepository = new InMemoryCommentQuestionRepository(),

    sut = new CreateCommentOnQuestionUseCase({
      questionRepository: inMemoryQuestionRepository,
      commentQuestionRepository: inMemoryCommentQuestionRepository,
    })
  })

  it('should be able to create a comment and question', async () => {

    const question = questionFactory();

    await inMemoryQuestionRepository.create(question);

    const result = await sut.execute({
      authorId: UUIDVO.generate(),
      questionId: question.id.getValue(),
      content: question.content,
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryCommentQuestionRepository.items[0]?.content).toEqual(question.content);
  })
});
