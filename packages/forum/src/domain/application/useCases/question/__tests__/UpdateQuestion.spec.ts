import { faker } from "@faker-js/faker";
import { NotAllwedError, UUIDVO } from "@repo/core";
import { expect } from "vitest";

import { InMemoryQuestionRepository } from "../../../repositories";
import { UpdateQuestionUseCase } from "../UpdateQuestion";
import { questionFactory } from "./factories/question-factory";

let repository: InMemoryQuestionRepository;
let sut: UpdateQuestionUseCase;

describe("UpdateQuestionUseCase", () => {
  beforeEach(() => {
    repository = new InMemoryQuestionRepository();
    sut = new UpdateQuestionUseCase(repository);
  });

  afterEach(() => {
    repository.items = [];
  });

  it("should update a question when the user is the owner", async () => {
    // Arrange
    const question = questionFactory({});
    await repository.create(question);

    const newTitle = faker.lorem.sentence();
    const newContent = faker.lorem.text();

    // Act
    await sut.execute({
      authorId: question.authorId.getValue(),
      questionId: question.id.getValue(),
      title: newTitle,
      content: newContent,
    });

    // Assert
    const updated = repository.items[0];
    expect(updated?.title).toBe(newTitle);
    expect(updated?.content).toBe(newContent);
  });

  it("should paginate results", async () => {
    // Arrange
    const items = Array.from({ length: 30 }, () => questionFactory({}));

    for (const q of items) {
      await repository.create(q);
    }

    // Act perPage
    const page1 = await repository.findAll({ page: 1, size: 10 });
    const page3 = await repository.findAll({ page: 3, size: 10 });

    // Assert
    expect(page1).toHaveLength(10);
    expect(page3).toHaveLength(10);
  });

  it("should throw NotAllwedError when updating a question from another user", async () => {
    // Arrange
    const question = questionFactory({});
    await repository.create(question);

    // Act + Assert
    await expect(
      sut.execute({
        authorId: UUIDVO.generate(), // outro usuário
        questionId: question.id.getValue(),
        title: faker.lorem.sentence(),
        content: faker.lorem.text(),
      })
    ).rejects.toBeInstanceOf(NotAllwedError);
  });
});
