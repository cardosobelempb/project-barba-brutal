import { UUIDVO } from '@repo/core';
import { expect } from 'vitest';

import { InMemoryCommentQuestionRepository } from '../../../repositories/InMemoryRepository';
import { commentQuestionFactory } from '../factories/comment-question-factory';
import { FetchCommentsQuestionUseCase } from '../FetchCommentsQuestion';

let inMemoryCommentQuestionRepository: InMemoryCommentQuestionRepository;
let sut: FetchCommentsQuestionUseCase;

describe('Feth Comments Question useCase', () => {

  beforeEach(() => {
    inMemoryCommentQuestionRepository = new InMemoryCommentQuestionRepository();
    sut = new FetchCommentsQuestionUseCase({commentQuestionRepository: inMemoryCommentQuestionRepository})
  })

  it('should be able to fetch comments Questions', async () => {

    const questionIdVO = UUIDVO.create();

    await inMemoryCommentQuestionRepository.create(commentQuestionFactory({questionId: questionIdVO}));
    await inMemoryCommentQuestionRepository.create(commentQuestionFactory({questionId: questionIdVO}));
    await inMemoryCommentQuestionRepository.create(commentQuestionFactory({questionId: questionIdVO}));

    const { value } = await sut.execute({
      questionId: questionIdVO.getValue(),
      page: 1
    });

    // console.log(commentsquestions);

    expect(value?.commentsQuestion).toHaveLength(3);
  })

  it('should be able to fetch paginated  fetch comments Questions', async () => {

    const questionIdVO = UUIDVO.create();

    for (let i = 1; i <= 22; i++){
      await inMemoryCommentQuestionRepository.create(commentQuestionFactory({questionId: questionIdVO}));
    }

    const { value } = await sut.execute({
      questionId: questionIdVO.getValue(),
      page: 2
    });

    expect(value?.commentsQuestion).toHaveLength(2);
  })

});
