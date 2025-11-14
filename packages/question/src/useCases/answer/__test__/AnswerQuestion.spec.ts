import { Pagination } from '@repo/core';
import { expect, test } from 'vitest';

import { AnswerEntity } from '../../../domain/entities/AnswerEnity';
import { AnswerInMemoryRepository } from '../../../domain/repositories/InMemoryRepository/AnswerInMemoryRepository';
import { AnswerQuestionUseCase } from "../AnswerQuestionUseCase";

const answerInMemoryRepository: AnswerInMemoryRepository = {
  findById: async function(id: string): Promise<AnswerEntity | null> {
    throw new Error('Function not implemented.');
  },
  findAll: async function(params: Pagination): Promise<AnswerEntity[]> {
    throw new Error('Function not implemented.');
  },
  update: async function(entity: AnswerEntity): Promise<void> {
    throw new Error('Function not implemented.');
  },
  delete: async function(entity: AnswerEntity): Promise<void> {
    throw new Error('Function not implemented.');
  },
  create: async function(entity: AnswerEntity): Promise<void> {
    return;
  }
}
let sut: AnswerQuestionUseCase;
test('Create an answer', async () => {

  sut = new AnswerQuestionUseCase(answerInMemoryRepository)
  const answer = await sut.execute({
    questionId: '1',
    intructorId:  '1',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})
