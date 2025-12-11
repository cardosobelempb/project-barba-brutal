import { SlugVO } from '@repo/core';
import { expect } from 'vitest';


import { InMemoryQuestionRepository } from '../../../repositories/InMemoryRepository';
import { questionFactory } from '../factories/question-factory';
import { GetQuestionBySlug } from '../GetQuestionBySlug';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: GetQuestionBySlug;

describe('Get Question By Slug', () => {

  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new GetQuestionBySlug(inMemoryQuestionRepository)
  })

  it('should be able to get a question by slug', async () => {

    const entity = questionFactory({
      slug: SlugVO.create("exemple-question")
    });

    await inMemoryQuestionRepository.create(entity);

    const { question } = await sut.execute({
      slug: entity.slug,
    });

    expect(question.id).toBeDefined();
    expect(question.slug.getValue()).toEqual(entity.slug.getValue());
    expect(question.title).toEqual(entity.title);
  })
});
