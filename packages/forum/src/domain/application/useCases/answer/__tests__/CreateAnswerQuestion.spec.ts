import { expect } from "vitest";

import { UUIDVO } from "@repo/core";
import { InMemoryAnswerRepository } from "../../../repositories/InMemoryRepository";
import { CreateAnswerQuestion } from "../CreateAnswerQuestion";
import { answerFactory } from "../factories/answer-factory";
import { InMemoryAnswerAttachmentRepository } from './../../../repositories/InMemoryRepository/InMemoryAnswerAttachmentRepository';

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let sut: CreateAnswerQuestion;

describe("Create Answer Question UseCase", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository = new InMemoryAnswerAttachmentRepository();
    inMemoryAnswerRepository = new InMemoryAnswerRepository(inMemoryAnswerAttachmentRepository);
    sut = new CreateAnswerQuestion({answerRepository: inMemoryAnswerRepository});
  });

  afterEach(() => {
    // Garante isolamento entre os testes
    inMemoryAnswerRepository.items = [];
  });

  it("should be able create answer an question", async () => {
    // Arrange: cria uma resposta válida

    const attachemnt1 = UUIDVO.create();
    const attachemnt2 = UUIDVO.create();

    const answer = answerFactory();

    // Act: executa o caso de uso com o mesmo autor
    const result = await sut.execute({
      intructorId: answer.authorId.getValue(),
      questionId: answer.questionId.getValue(),
      content: answer.content,
      attachmentsIds: [attachemnt1.getValue(), attachemnt2.getValue()]
    });

    // Assert: verifica que foi removida do repositório
    expect(result.isRight()).toBe(true);
    expect(inMemoryAnswerRepository.items[0]).toEqual(result.value?.answer);

    expect(inMemoryAnswerRepository.items[0]?.attachments.getItems()).toHaveLength(2);
    expect(inMemoryAnswerRepository.items[0]?.attachments.getItems()[0]?.attachmentId.getValue()).toEqual(attachemnt1.getValue());
    expect(inMemoryAnswerRepository.items[0]?.attachments.getItems()).toEqual([
      expect.objectContaining({attachmentId: attachemnt1}),
      expect.objectContaining({attachmentId: attachemnt2}),
    ]);
  });
});
