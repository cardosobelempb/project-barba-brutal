import { NotAllwedError, UUIDVO } from "@repo/core";
import { expect } from "vitest";


import { InMemoryQuestionRepository } from "../../../repositories/InMemoryRepository";
import { DeleteQuestion } from "../DeleteQuestion";
import { questionFactory } from "../factories/question-factory";

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: DeleteQuestion;

describe("Delete Question", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new DeleteQuestion(inMemoryQuestionRepository);
  });

  afterEach(() => {
    inMemoryQuestionRepository.items = [];
  });

  it("should be able to delete a question", async () => {
    // Arrange
    const entity = questionFactory({});
    await inMemoryQuestionRepository.create(entity);


    // Act
    await sut.execute({
      authorId: entity.authorId.getValue(),
      questionId: entity.id.getValue(),
    });

    // Assert
    expect(inMemoryQuestionRepository.items).toHaveLength(0);
  });

  it("should not be able to delete a question from another user", async () => {
    // Arrange
    const entity = questionFactory({});
    await inMemoryQuestionRepository.create(entity);
    const result = await sut.execute({
        authorId: UUIDVO.generate(), // força falha corretamente
        questionId: entity.id.getValue(),
      })
    // Act + Assert
    expect(result.value).toBeInstanceOf(NotAllwedError);
  });
});
