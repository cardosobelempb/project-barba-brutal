import { Pagination } from "@repo/core";

import { CommentAnswer } from "../../../enterprise/entities";
import { CommentAnswerRepository } from "../CommentAnswerRepository";

export class InMemoryCommentAnswerRepository implements CommentAnswerRepository {
  public items: CommentAnswer[] = [];

  /**
   * Busca uma questão pelo ID
   */
  async findById(id: string): Promise<CommentAnswer | null> {
    return this.items.find((item) => item.id.getValue() === id) ?? null;
  }

  /**
   * Retorna todas as questões com paginação simples
   */
  async findAll({ page = 1, size = 10 }: Pagination): Promise<CommentAnswer[]> {
    // Proteção contra paginação inválida
    const _page = Math.max(1, page);
    const _size = Math.max(1, size);

    const start = (_page - 1) * _size;
    const end = start + _size;

    return this.items.slice(start, end);
  }

  /**
   * Cria uma nova questão no repositório
   */
  async create(entity: CommentAnswer): Promise<void> {
    this.items.push(entity);
  }

  /**
   * Atualiza uma questão existente.
   * Lança erro se não existir (evita inconsistências silenciosas).
   */
  async update(entity: CommentAnswer): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(entity.id));

    if (index === -1) {
      throw new Error(
        `Cannot update: CommentAnswer with ID ${entity.id.getValue()} not found.`,
      );
    }

    // Atualiza mantendo posição original
    this.items[index] = entity;
  }

  /**
   * Exclui uma questão do repositório.
   */
  async delete(entity: CommentAnswer): Promise<void> {
    // remove por valor do ID (correto)
    this.items = this.items.filter((item) => !item.id.equals(entity.id));
  }
}
