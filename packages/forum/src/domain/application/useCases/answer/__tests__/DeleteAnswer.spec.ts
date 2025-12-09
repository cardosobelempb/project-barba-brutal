import { NotAllwedError, UUIDVO } from "@repo/core";
import { expect } from "vitest";

import { InMemoryAnswerRepository } from "../../../repositories";
import { DeleteAnswerUseCase } from "../DeleteAnswer";
import { answerFactory } from "../factories/answer-factory";

let repository: InMemoryAnswerRepository;
let sut: DeleteAnswerUseCase;

describe("DeleteAnswerUseCase", () => {
  beforeEach(() => {
    repository = new InMemoryAnswerRepository();
    sut = new DeleteAnswerUseCase(repository);
  });

  afterEach(() => {
    // Garante isolamento entre os testes
    repository.items = [];
  });

  it("should delete an answer when the author is the owner", async () => {
    // Arrange: cria uma resposta válida
    const answer = answerFactory({});
    await repository.create(answer);

    // Act: executa o caso de uso com o mesmo autor
    await sut.execute({
      authorId: answer.authorId.getValue(),
      answerId: answer.id.getValue(),
    });

    // Assert: verifica que foi removida do repositório
    expect(repository.items).toHaveLength(0);
  });

  it("should throw NotAllwedError when trying to delete an answer from another user", async () => {
    // Arrange: cria uma resposta com autor X
    const answer = answerFactory({});
    await repository.create(answer);

    const anotherUserId = UUIDVO.generate();

    // Act + Assert: garante que a permissão falha corretamente
    await expect(
      sut.execute({
        authorId: anotherUserId,
        answerId: answer.id.getValue(),
      })
    ).rejects.toBeInstanceOf(NotAllwedError);
  });
});
