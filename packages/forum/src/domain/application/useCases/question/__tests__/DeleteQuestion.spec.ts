import { NotAllwedError, UUIDVO } from "@repo/core";
import { expect } from "vitest";

import { InMemoryQuestionRepository } from "../../../repositories/InMemoryRepository";
import { InMemoryQuestionAttachmentRepository } from "../../../repositories/InMemoryRepository/InMemoryQuestionAttachmentRepository";
import { DeleteQuestion } from "../DeleteQuestion";
import { questionAttachementFactory } from "../factories/question-attachment-factory";
import { questionFactory } from "../factories/question-factory";

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository;
let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: DeleteQuestion;

describe("Delete Question", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentRepository();
    inMemoryQuestionRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentRepository);
    sut = new DeleteQuestion(inMemoryQuestionRepository);
  });

  afterEach(() => {
    inMemoryQuestionRepository.items = [];
  });

  it("should be able to delete a question", async () => {
    // Arrange
    const question = questionFactory({});
    await inMemoryQuestionRepository.create(question);

    const attachemnt1 = UUIDVO.create();
    const attachemnt2 = UUIDVO.create();

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
    });

    // Assert
    expect(inMemoryQuestionRepository.items).toHaveLength(0);
    expect(inMemoryQuestionAttachmentRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a question from another user", async () => {
    // Arrange
    const question = questionFactory({});
    await inMemoryQuestionRepository.create(question);
    const result = await sut.execute({
        authorId: UUIDVO.generate(), // força falha corretamente
        questionId: question.id.getValue(),
      })
    // Act + Assert
    expect(result.value).toBeInstanceOf(NotAllwedError);
  });
});
