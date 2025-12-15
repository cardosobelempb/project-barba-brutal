import { expect } from 'vitest';

import { InMemoryQuestionRepository } from '../../../repositories/InMemoryRepository';
import { questionFactory } from '../factories/question-factory';
import { GetQuestionBySlug } from '../GetQuestionBySlug';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: GetQuestionBySlug;

describe('Get Question By Slug', () => {

  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new GetQuestionBySlug({questionRepository: inMemoryQuestionRepository})
  })

  it('should be able to get a question by slug', async () => {

    const question = questionFactory({});

    await inMemoryQuestionRepository.create(question);

    const result = await sut.execute({
      slug: question.slug,
    });

    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: question.title
      })
    });
  })
});
