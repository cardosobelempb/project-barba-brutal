import { expect } from 'vitest';


import { InMemoryQuestionRepository } from '../../../repositories/InMemoryRepository';
import { questionFactory } from '../factories/question-factory';
import { FetchRecentQuestion } from '../FetchRecentQuestion';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: FetchRecentQuestion;

describe('Feth Recent Question', () => {

  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new FetchRecentQuestion({questionRepository: inMemoryQuestionRepository})
  })

  it('should be able to fetch recent questions', async () => {

    await inMemoryQuestionRepository.create(questionFactory({ createdAt: new Date(2025, 0, 20) }));
    await inMemoryQuestionRepository.create(questionFactory({ createdAt: new Date(2025, 0, 18) }));
    await inMemoryQuestionRepository.create(questionFactory({createdAt: new Date(2025, 0, 23)}));

    const { value } = await sut.execute({
      page: 1
    });

    // console.log(questions);

    expect(value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2025, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 18) })
    ]);
  })

  it('should be able to fetch paginated recent questions', async () => {

    for (let i = 1; i <= 22; i++){
      await inMemoryQuestionRepository.create(questionFactory({}));
    }

    const { value } = await sut.execute({
      page: 2
    });

    expect(value?.questions).toHaveLength(2);
  })

});
