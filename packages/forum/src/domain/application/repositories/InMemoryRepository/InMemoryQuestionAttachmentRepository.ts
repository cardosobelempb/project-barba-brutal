import { Pagination, UUIDVO } from "@repo/core";

import { QuestionAttachment } from "../../../enterprise";
import { QuestionAttachmentRepository } from "../QuestionAttachmentRepository";

export class InMemoryQuestionAttachmentRepository implements QuestionAttachmentRepository {

  public items: QuestionAttachment[] = [];

  /**
   * Busca uma questão pelo ID
   */
  async findById(id: string): Promise<QuestionAttachment | null> {
    return this.items.find((item) => item.id.getValue() === id) ?? null;
  }

  /**
   * Retorna todas as questões com paginação simples
   */
  async findAll({ page = 1, size = 10 }: Pagination): Promise<QuestionAttachment[]> {
    // Proteção contra paginação inválida
    const _page = Math.max(1, page);
    const _size = Math.max(1, size);

    const start = (_page - 1) * _size;
    const end = start + _size;

    return this.items.slice(start, end);
  }

  async findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    return this.items.filter((item) => item.questionId.equals(UUIDVO.create(questionId)));
  }

   async findManyByQuestionAttachmentId(
    questionId: string,
    { page = 1, size = 20 }: Pagination,
  ): Promise<QuestionAttachment[]> {
    // Criamos o value object apenas uma vez (evita recalcular para cada item)
    const questionIdVO = UUIDVO.create(questionId);

    // Filtramos respostas pertencentes à questão alvo
    const filteredQuestions = this.items.filter((item) =>
      item.questionId.equals(questionIdVO),
    );

    // Sanitizamos os valores da paginação
    const currentPage = Math.max(1, page);
    const pageSize = Math.max(1, size);

    // Calculamos o deslocamento (offset)
    const offset = (currentPage - 1) * pageSize;

    // Retornamos o slice da página atual
    return filteredQuestions.slice(offset, offset + pageSize);
  }

  /**
   * Cria uma nova questão no repositório
   */
  async create(entity: QuestionAttachment): Promise<void> {
    this.items.push(entity);
  }

  /**
   * Atualiza uma questão existente.
   * Lança erro se não existir (evita inconsistências silenciosas).
   */
  async update(entity: QuestionAttachment): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(entity.id));

    if (index === -1) {
      throw new Error(
        `Cannot update: QuestionComment with ID ${entity.id.getValue()} not found.`,
      );
    }

    // Atualiza mantendo posição original
    this.items[index] = entity;
  }

  /**
   * Exclui uma questão do repositório.
   */
  async delete(entity: QuestionAttachment): Promise<void> {
    // remove por valor do ID (correto)
    this.items = this.items.filter((item) => !item.id.equals(entity.id));
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
     this.items = this.items.filter(
      (item) => item.questionId.getValue() !== questionId,
    );
    // const questionAttachments = this.items.filter(item => item.questionId.toString() !== questionId);
    // this.items = questionAttachments;
  }
}
