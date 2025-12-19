import { faker } from "@faker-js/faker";
import { NotAllwedError, UUIDVO } from "@repo/core";
import { expect } from "vitest";

import { InMemoryAnswerRepository } from "../../../repositories/InMemoryRepository";
import { answerAttachementFactory } from "../factories/answer-attachment-factory";
import { answerFactory } from "../factories/answer-factory";
import { UpdateAnswerUseCase } from "../UpdateAnswer";
import { InMemoryAnswerAttachmentRepository } from "./../../../repositories/InMemoryRepository/InMemoryAnswerAttachmentRepository";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let sut: UpdateAnswerUseCase;

describe("UpdateAnswerUseCase", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository();
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentRepository,
    );
    sut = new UpdateAnswerUseCase({
      answerRepository: inMemoryAnswerRepository,
      answerAttachmentRepository: inMemoryAnswerAttachmentRepository,
    });
  });

  afterEach(() => {
    inMemoryAnswerRepository.items = [];
  });

  it("should update a answer when the user is the owner", async () => {
    // Arrange
    const answer = answerFactory({});
    await inMemoryAnswerRepository.create(answer);

    const attachemnt1 = UUIDVO.create();
    const attachemnt2 = UUIDVO.create();
    const attachemnt3 = UUIDVO.create();
    const newContent = faker.lorem.text();

    inMemoryAnswerAttachmentRepository.items.push(
      answerAttachementFactory({
        attachmentId: attachemnt1,
        answerId: answer.id,
      }),
      answerAttachementFactory({
        attachmentId: attachemnt2,
        answerId: answer.id,
      }),
    );

    // Act
    await sut.execute({
      authorId: answer.authorId.getValue(),
      answerId: answer.id.getValue(),
      content: newContent,
      attachmentsIds: [attachemnt1.getValue(), attachemnt3.getValue()],
    });

    // Assert
    const updated = inMemoryAnswerRepository.items[0];
    expect(updated?.content).toBe(newContent);

    expect(
      inMemoryAnswerRepository.items[0]?.attachments.getItems(),
    ).toHaveLength(2);
    expect(
      inMemoryAnswerRepository.items[0]?.attachments
        .getItems()[0]
        ?.attachmentId.getValue(),
    ).toEqual(attachemnt1.getValue());
  });

  it("should paginate results", async () => {
    // Arrange
    const items = Array.from({ length: 30 }, () => answerFactory({}));

    for (const q of items) {
      await inMemoryAnswerRepository.create(q);
    }

    // Act perPage
    const page1 = await inMemoryAnswerRepository.findAll({ page: 1, size: 10 });
    const page3 = await inMemoryAnswerRepository.findAll({ page: 3, size: 10 });

    // Assert
    expect(page1).toHaveLength(10);
    expect(page3).toHaveLength(10);
  });

  it("should throw NotAllwedError when updating a answer from another user", async () => {
    // Arrange
    const attachemnt1 = UUIDVO.create();
    const attachemnt2 = UUIDVO.create();

    const answer = answerFactory({});
    inMemoryAnswerAttachmentRepository.items.push(
      answerAttachementFactory({
        attachmentId: attachemnt1,
        answerId: answer.id,
      }),
      answerAttachementFactory({
        attachmentId: attachemnt2,
        answerId: answer.id,
      }),
    );

    await inMemoryAnswerRepository.create(answer);
    const result = await sut.execute({
      authorId: UUIDVO.generate(), // outro usuário
      answerId: answer.id.getValue(),
      content: faker.lorem.text(),
      attachmentsIds: [attachemnt1.getValue(), UUIDVO.generate()],
    });
    // Act + Assert
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllwedError);
  });
});
