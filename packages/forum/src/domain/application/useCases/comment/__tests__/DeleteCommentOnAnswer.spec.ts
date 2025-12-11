import { NotAllwedError, UUIDVO } from "@repo/core";
import { expect } from "vitest";

import { InMemoryCommentAnswerRepository } from "../../../repositories/InMemoryRepository";
import { DeleteCommentOnAnswerUseCase } from "../DeleteCommentOnAnswer";
import { commentAnswerFactory } from "../factories/comment-answer-factory";

let inMemoryCommentAnswerRepository: InMemoryCommentAnswerRepository;
let sut: DeleteCommentOnAnswerUseCase;

describe("Delete Comment On Answer UseCase", () => {
  beforeEach(() => {
    inMemoryCommentAnswerRepository = new InMemoryCommentAnswerRepository();
    sut = new DeleteCommentOnAnswerUseCase({ commentAnswerRepository: inMemoryCommentAnswerRepository});
  });

  afterEach(() => {
    inMemoryCommentAnswerRepository.items = [];
  });

  it("should be able to delete comment On answer", async () => {
    // Arrange
    const entity = commentAnswerFactory({});
    await inMemoryCommentAnswerRepository.create(entity);


    // Act
    await sut.execute({
      authorId: entity.authorId.getValue(),
      commentAnswerId: entity.id.getValue(),
    });

    // Assert
    expect(inMemoryCommentAnswerRepository.items).toHaveLength(0);
  });

  it("should not be able to delete comment on answer from another user", async () => {
    // Arrange
    const entity = commentAnswerFactory({});
    await inMemoryCommentAnswerRepository.create(entity);

    // Act + Assert
    await expect(
      sut.execute({
        authorId: UUIDVO.generate(), // força falha corretamente
        commentAnswerId: entity.id.getValue(),
      })
    ).rejects.toBeInstanceOf(NotAllwedError);
  });
});
