import { faker } from "@faker-js/faker";
import { NotAllwedError, UUIDVO } from "@repo/core";
import { expect } from "vitest";

import { InMemoryAnswerRepository } from "../../../repositories";
import { UpdateAnswerUseCase } from "../UpdateAnswer";
import { answerFactory } from "./factories/answer-factory";

let repository: InMemoryAnswerRepository;
let sut: UpdateAnswerUseCase;

describe("UpdateAnswerUseCase", () => {
  beforeEach(() => {
    repository = new InMemoryAnswerRepository();
    sut = new UpdateAnswerUseCase(repository);
  });

  afterEach(() => {
    repository.items = [];
  });

  it("should update a answer when the user is the owner", async () => {
    // Arrange
    const answer = answerFactory({});
    await repository.create(answer);

    const newTitle = faker.lorem.sentence();
    const newContent = faker.lorem.text();

    // Act
    await sut.execute({
      authorId: answer.authorId.getValue(),
      answerId: answer.id.getValue(),
      content: newContent,
    });

    // Assert
    const updated = repository.items[0];
    expect(updated?.content).toBe(newContent);
  });

  it("should paginate results", async () => {
    // Arrange
    const items = Array.from({ length: 30 }, () => answerFactory({}));

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

  it("should throw NotAllwedError when updating a answer from another user", async () => {
    // Arrange
    const answer = answerFactory({});
    await repository.create(answer);

    // Act + Assert
    await expect(
      sut.execute({
        authorId: UUIDVO.generate(), // outro usuário
        answerId: answer.id.getValue(),
        content: faker.lorem.text(),
      })
    ).rejects.toBeInstanceOf(NotAllwedError);
  });
});
