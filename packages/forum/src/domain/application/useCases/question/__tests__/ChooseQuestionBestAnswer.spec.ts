import { NotAllwedError, UUIDVO } from "@repo/core";
import { expect } from "vitest";


import { InMemoryQuestionRepository } from "../../../repositories/InMemoryRepository";
import { answerFactory } from "../../answer/factories/answer-factory";
import { ChooseQuestionBestAnswerUseCase } from "../ChooseQuestionBestAnswer";
import { questionFactory } from "../factories/question-factory";
import { InMemoryAnswerRepository } from './../../../repositories/InMemoryRepository/InMemoryAnswerRepository';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe("Choose Question Best Answer UseCase", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new ChooseQuestionBestAnswerUseCase({
      answerRepository: inMemoryAnswerRepository,
      questionRepository: inMemoryQuestionRepository
    });
  });

  afterEach(() => {
    inMemoryQuestionRepository.items = [];
  });

  it("should be able to choose the question best answer", async () => {
    // Arrange
    const question = questionFactory({});
    const answer = answerFactory({
      questionId: question.id,
    });

    await inMemoryQuestionRepository.create(question);
    await inMemoryAnswerRepository.create(answer);


    // Act
    await sut.execute({
      answerId: answer.id.getValue(),
      authorId: question.authorId.getValue(),
    });

    // Assert
    expect(inMemoryQuestionRepository.items).toHaveLength(1);
    expect(inMemoryQuestionRepository.items[0]?.bestAnswerId).toBe(answer.id);
  });

  it("should not be able to choose another user question best answer", async () => {
    // Arrange
    const question = questionFactory({});
    const answer = answerFactory({
      questionId: question.id,
    });

    await inMemoryQuestionRepository.create(question);
    await inMemoryAnswerRepository.create(answer);

    // Act + Assert
    await expect(
      sut.execute({
        authorId: UUIDVO.generate(), // força falha corretamente
        answerId: answer.id.getValue(),
      })
    ).rejects.toBeInstanceOf(NotAllwedError);
  });
});
