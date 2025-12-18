import { expect } from "vitest";

import { InMemoryAnswerRepository } from "../../../repositories/InMemoryRepository";
import { CreateAnswerQuestion } from "../CreateAnswerQuestion";
import { answerFactory } from "../factories/answer-factory";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: CreateAnswerQuestion;

describe("Create Answer Question UseCase", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new CreateAnswerQuestion({answerRepository: inMemoryAnswerRepository});
  });

  afterEach(() => {
    // Garante isolamento entre os testes
    inMemoryAnswerRepository.items = [];
  });

  it("should be able create answer an question", async () => {
    // Arrange: cria uma resposta válida
    const answer = answerFactory();

    // Act: executa o caso de uso com o mesmo autor
    const result = await sut.execute({
      intructorId: answer.authorId.getValue(),
      questionId: answer.questionId.getValue(),
      content: answer.content,
    });

    // Assert: verifica que foi removida do repositório
    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswerRepository.items[0]).toEqual(result.value?.answer);
  });
});
