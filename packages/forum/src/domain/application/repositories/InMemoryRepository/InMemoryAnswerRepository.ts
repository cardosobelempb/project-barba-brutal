import { Pagination } from "@repo/core";

import { Answer } from "../../../enterprise/entities";
import { AnswerRepository } from "../AnswerRepository";

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = [];

  /**
   * Busca uma questão pelo ID
   */
  async findById(id: string): Promise<Answer | null> {
    return this.items.find((item) => item.id.getValue() === id) ?? null;
  }

  /**
   * Retorna todas as questões com paginação simples
   */
  async findAll({ page = 1, size = 10 }: Pagination): Promise<Answer[]> {
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
  async create(entity: Answer): Promise<void> {
    this.items.push(entity);
  }

  /**
   * Atualiza uma questão existente.
   * Lança erro se não existir (evita inconsistências silenciosas).
   */
  async update(entity: Answer): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(entity.id));

    if (index === -1) {
      throw new Error(
        `Cannot update: Answer with ID ${entity.id.getValue()} not found.`,
      );
    }

    // Atualiza mantendo posição original
    this.items[index] = entity;
  }

  /**
   * Exclui uma questão do repositório.
   */
  async delete(entity: Answer): Promise<void> {
    // remove por valor do ID (correto)
    this.items = this.items.filter((item) => !item.id.equals(entity.id));
  }
}
