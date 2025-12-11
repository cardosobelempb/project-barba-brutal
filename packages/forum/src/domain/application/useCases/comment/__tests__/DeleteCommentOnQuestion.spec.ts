import { NotAllwedError, UUIDVO } from "@repo/core";
import { expect } from "vitest";

import { InMemoryCommentQuestionRepository } from "../../../repositories/InMemoryRepository";
import { DeleteCommentOnQuestionUseCase } from "../DeleteCommentOnQuestion";
import { commentQuestionFactory } from "../factories/comment-question-factory";

let inMemoryCommentQuestionRepository: InMemoryCommentQuestionRepository;
let sut: DeleteCommentOnQuestionUseCase;

describe("Delete Comment On Question UseCase", () => {
  beforeEach(() => {
    inMemoryCommentQuestionRepository = new InMemoryCommentQuestionRepository();
    sut = new DeleteCommentOnQuestionUseCase({ commentQuestionRepository: inMemoryCommentQuestionRepository});
  });

  afterEach(() => {
    inMemoryCommentQuestionRepository.items = [];
  });

  it("should be able to delete comment On question", async () => {
    // Arrange
    const entity = commentQuestionFactory({});
    await inMemoryCommentQuestionRepository.create(entity);


    // Act
    await sut.execute({
      authorId: entity.authorId.getValue(),
      commentQuestionId: entity.id.getValue(),
    });

    // Assert
    expect(inMemoryCommentQuestionRepository.items).toHaveLength(0);
  });

  it("should not be able to delete comment on question from another user", async () => {
    // Arrange
    const entity = commentQuestionFactory({});
    await inMemoryCommentQuestionRepository.create(entity);

    // Act + Assert
    await expect(
      sut.execute({
        authorId: UUIDVO.generate(), // força falha corretamente
        commentQuestionId: entity.id.getValue(),
      })
    ).rejects.toBeInstanceOf(NotAllwedError);
  });
});
