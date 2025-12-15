import { faker } from "@faker-js/faker";
import { NotAllwedError, UUIDVO } from "@repo/core";
import { expect } from "vitest";

import { InMemoryAnswerRepository } from "../../../repositories/InMemoryRepository";
import { answerFactory } from "../factories/answer-factory";
import { UpdateAnswerUseCase } from "../UpdateAnswer";

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: UpdateAnswerUseCase;

describe("UpdateAnswerUseCase", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new UpdateAnswerUseCase({answerRepository: inMemoryAnswerRepository});
  });

  afterEach(() => {
    inMemoryAnswerRepository.items = [];
  });

  it("should update a answer when the user is the owner", async () => {
    // Arrange
    const answer = answerFactory({});
    await inMemoryAnswerRepository.create(answer);

    const newContent = faker.lorem.text();

    // Act
    await sut.execute({
      authorId: answer.authorId.getValue(),
      answerId: answer.id.getValue(),
      content: newContent,
    });

    // Assert
    const updated = inMemoryAnswerRepository.items[0];
    expect(updated?.content).toBe(newContent);
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
    const answer = answerFactory({});
    await inMemoryAnswerRepository.create(answer);
    const result = await sut.execute({
        authorId: UUIDVO.generate(), // outro usuário
        answerId: answer.id.getValue(),
        content: faker.lorem.text(),
      })
    // Act + Assert
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllwedError);
  });
});
