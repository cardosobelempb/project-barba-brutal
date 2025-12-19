import { NotAllwedError, UUIDVO } from "@repo/core";
import { expect } from "vitest";

import { InMemoryAnswerRepository } from "../../../repositories/InMemoryRepository";

import { DeleteAnswerUseCase } from "../DeleteAnswer";
import { answerAttachementFactory } from "../factories/answer-attachment-factory";
import { answerFactory } from "../factories/answer-factory";
import { InMemoryAnswerAttachmentRepository } from './../../../repositories/InMemoryRepository/InMemoryAnswerAttachmentRepository';

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let sut: DeleteAnswerUseCase;

describe("DeleteAnswerUseCase", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository = new InMemoryAnswerAttachmentRepository();
    inMemoryAnswerRepository = new InMemoryAnswerRepository(inMemoryAnswerAttachmentRepository);
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository);
  });

  afterEach(() => {
    // Garante isolamento entre os testes
    inMemoryAnswerRepository.items = [];
  });

  it("should delete an answer when the author is the owner", async () => {
    // Arrange: cria uma resposta válida
    const answer = answerFactory({});
    await inMemoryAnswerRepository.create(answer);

    const attachemnt1 = UUIDVO.create();
    const attachemnt2 = UUIDVO.create();

    inMemoryAnswerAttachmentRepository.items.push(
          answerAttachementFactory({
            attachmentId: attachemnt1,
            answerId: answer.id,
          }),
          answerAttachementFactory({
            attachmentId: attachemnt2,
            answerId: answer.id,
          })
        )

    // Act: executa o caso de uso com o mesmo autor
    await sut.execute({
      authorId: answer.authorId.getValue(),
      answerId: answer.id.getValue(),
    });

    // Assert: verifica que foi removida do repositório
    expect(inMemoryAnswerRepository.items).toHaveLength(0);
    expect(inMemoryAnswerAttachmentRepository.items).toHaveLength(0);
  });

  it("should throw NotAllwedError when trying to delete an answer from another user", async () => {
    // Arrange: cria uma resposta com autor X
    const answer = answerFactory({});
    await inMemoryAnswerRepository.create(answer);

    const anotherUserId = UUIDVO.generate();
    const result = await sut.execute({
        authorId: anotherUserId,
        answerId: answer.id.getValue(),
      })

    // Act + Assert: garante que a permissão falha corretamente
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllwedError);
  });
});
