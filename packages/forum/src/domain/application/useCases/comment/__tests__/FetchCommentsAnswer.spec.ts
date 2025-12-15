import { UUIDVO } from '@repo/core';
import { expect } from 'vitest';

import { InMemoryCommentAnswerRepository } from '../../../repositories/InMemoryRepository';
import { commentAnswerFactory } from '../factories/comment-answer-factory';
import { FetchCommentsAnswerUseCase } from '../FetchCommentsAnswer';

let inMemoryCommentAnswerRepository: InMemoryCommentAnswerRepository;
let sut: FetchCommentsAnswerUseCase;

describe('Feth Comments Answer useCase', () => {

  beforeEach(() => {
    inMemoryCommentAnswerRepository = new InMemoryCommentAnswerRepository();
    sut = new FetchCommentsAnswerUseCase({commentAnswerRepository: inMemoryCommentAnswerRepository})
  })

  it('should be able to fetch comments Answers', async () => {

    const answerIdVO = UUIDVO.create();

    await inMemoryCommentAnswerRepository.create(commentAnswerFactory({answerId: answerIdVO}));
    await inMemoryCommentAnswerRepository.create(commentAnswerFactory({answerId: answerIdVO}));
    await inMemoryCommentAnswerRepository.create(commentAnswerFactory({answerId: answerIdVO}));

    const { value } = await sut.execute({
      answerId: answerIdVO.getValue(),
      page: 1
    });

    // console.log(commentsanswers);

    expect(value?.commentsAnswer).toHaveLength(3);
  })

  it('should be able to fetch paginated  fetch comments Answers', async () => {

    const answerIdVO = UUIDVO.create();

    for (let i = 1; i <= 22; i++){
      await inMemoryCommentAnswerRepository.create(commentAnswerFactory({answerId: answerIdVO}));
    }

    const { value } = await sut.execute({
      answerId: answerIdVO.getValue(),
      page: 2
    });

    expect(value?.commentsAnswer).toHaveLength(2);
  })

});
