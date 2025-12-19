import { Pagination, UUIDVO } from "@repo/core";

import { AnswerAttachment } from "../../../enterprise";
import { AnswerAttachmentRepository } from "../AnswerAttchmentRepository";


export class InMemoryAnswerAttachmentRepository implements AnswerAttachmentRepository {

  public items: AnswerAttachment[] = [];

  /**
   * Busca uma questão pelo ID
   */
  async findById(id: string): Promise<AnswerAttachment | null> {
    return this.items.find((item) => item.id.getValue() === id) ?? null;
  }

  /**
   * Retorna todas as questões com paginação simples
   */
  async findAll({ page = 1, size = 10 }: Pagination): Promise<AnswerAttachment[]> {
    // Proteção contra paginação inválida
    const _page = Math.max(1, page);
    const _size = Math.max(1, size);

    const start = (_page - 1) * _size;
    const end = start + _size;

    return this.items.slice(start, end);
  }

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    return this.items.filter((item) => item.answerId.equals(UUIDVO.create(answerId)));
  }

   async findManyByAnswerAttachmentId(
    answerId: string,
    { page = 1, size = 20 }: Pagination,
  ): Promise<AnswerAttachment[]> {
    // Criamos o value object apenas uma vez (evita recalcular para cada item)
    const answerIdVO = UUIDVO.create(answerId);

    // Filtramos respostas pertencentes à questão alvo
    const filteredAnswers = this.items.filter((item) =>
      item.answerId.equals(answerIdVO),
    );

    // Sanitizamos os valores da paginação
    const currentPage = Math.max(1, page);
    const pageSize = Math.max(1, size);

    // Calculamos o deslocamento (offset)
    const offset = (currentPage - 1) * pageSize;

    // Retornamos o slice da página atual
    return filteredAnswers.slice(offset, offset + pageSize);
  }

  /**
   * Cria uma nova questão no repositório
   */
  async create(entity: AnswerAttachment): Promise<void> {
    this.items.push(entity);
  }

  /**
   * Atualiza uma questão existente.
   * Lança erro se não existir (evita inconsistências silenciosas).
   */
  async update(entity: AnswerAttachment): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(entity.id));

    if (index === -1) {
      throw new Error(
        `Cannot update: AnswerComment with ID ${entity.id.getValue()} not found.`,
      );
    }

    // Atualiza mantendo posição original
    this.items[index] = entity;
  }

  /**
   * Exclui uma questão do repositório.
   */
  async delete(entity: AnswerAttachment): Promise<void> {
    // remove por valor do ID (correto)
    this.items = this.items.filter((item) => !item.id.equals(entity.id));
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
     this.items = this.items.filter(
      (item) => item.answerId.getValue() !== answerId,
    );
    // const answerAttachments = this.items.filter(item => item.answerId.toString() !== answerId);
    // this.items = answerAttachments;
  }
}
