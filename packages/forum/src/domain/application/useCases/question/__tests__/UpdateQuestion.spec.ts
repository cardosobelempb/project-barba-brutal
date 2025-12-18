import { faker } from "@faker-js/faker";
import { NotAllwedError, UUIDVO } from "@repo/core";
import { expect } from "vitest";

import { InMemoryQuestionRepository } from "../../../repositories/InMemoryRepository";
import { InMemoryQuestionAttachmentRepository } from "../../../repositories/InMemoryRepository/InMemoryQuestionAttachmentRepository";
import { questionAttachementFactory } from "../factories/question-attachment-factory";
import { questionFactory } from "../factories/question-factory";
import { UpdateQuestionUseCase } from "../UpdateQuestion";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository;
let sut: UpdateQuestionUseCase;

describe("UpdateQuestionUseCase", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentRepository();
    inMemoryQuestionRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentRepository);
    sut = new UpdateQuestionUseCase({
      questionRepository: inMemoryQuestionRepository,
      questionAttatchmentRepository: inMemoryQuestionAttachmentRepository
    });
  });

  afterEach(() => {
    inMemoryQuestionRepository.items = [];
  });

  it("should update a question when the user is the owner", async () => {
    // Arrange
    const question = questionFactory({});
    await inMemoryQuestionRepository.create(question);

    const newTitle = faker.lorem.sentence();
    const newContent = faker.lorem.text();

    const attachemnt1 = UUIDVO.create();
    const attachemnt2 = UUIDVO.create();
    const attachemnt3 = UUIDVO.create();

    inMemoryQuestionAttachmentRepository.items.push(
      questionAttachementFactory({
        attachmentId: attachemnt1,
        questionId: question.id,
      }),
      questionAttachementFactory({
        attachmentId: attachemnt2,
        questionId: question.id,
      })
    )
    // Act
    await sut.execute({
      authorId: question.authorId.getValue(),
      questionId: question.id.getValue(),
      title: newTitle,
      content: newContent,
      attachemntsIds: [attachemnt1.getValue(), attachemnt3.getValue()]
    });

    // Assert
    const updated = inMemoryQuestionRepository.items[0];

    expect(updated?.title).toBe(newTitle);
    expect(updated?.content).toBe(newContent);
    expect(updated).toMatchObject({
      title: updated?.title,
      content: updated?.content,
    });

    expect(inMemoryQuestionRepository.items[0]?.attachments.getItems()).toHaveLength(2);
    expect(inMemoryQuestionRepository.items[0]?.attachments.getItems()[0]?.attachmentId.getValue()).toEqual(attachemnt1.getValue());
    expect(inMemoryQuestionRepository.items[0]?.attachments.getItems()).toEqual([
      expect.objectContaining({attachmentId: attachemnt1}),
      expect.objectContaining({attachmentId: attachemnt3}),
    ]);

  });

  it("should paginate results", async () => {
    // Arrange
    const items = Array.from({ length: 30 }, () => questionFactory({}));

    for (const q of items) {
      await inMemoryQuestionRepository.create(q);
    }

    // Act perPage
    const page1 = await inMemoryQuestionRepository.findAll({ page: 1, size: 10 });
    const page3 = await inMemoryQuestionRepository.findAll({ page: 3, size: 10 });

    // Assert
    expect(page1).toHaveLength(10);
    expect(page3).toHaveLength(10);
  });

  it("should throw NotAllwedError when updating a question from another user", async () => {

    const attachemnt1 = UUIDVO.create();
    const attachemnt2 = UUIDVO.create();
    // Arrange
    const question = questionFactory({});

    inMemoryQuestionAttachmentRepository.items.push(
      questionAttachementFactory({
        attachmentId: attachemnt1,
        questionId: question.id,
      }),
      questionAttachementFactory({
        attachmentId: attachemnt2,
        questionId: question.id,
      })
    )


    await inMemoryQuestionRepository.create(question);
    const result = await sut.execute({
        authorId: UUIDVO.generate(), // outro usuário
        questionId: question.id.getValue(),
        title: faker.lorem.sentence(),
        content: faker.lorem.text(),
        attachemntsIds: [attachemnt1.getValue(), UUIDVO.generate()]
      })
    // Act + Assert
    expect(result.value).toBeInstanceOf(NotAllwedError);
  });
});
