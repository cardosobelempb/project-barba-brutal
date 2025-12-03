import { AbstractUseCase, BadRequestError, NotAllwedError } from "@repo/core";

import { AnswerRepository } from "../../repositories";

export namespace UpdateAnswer {
  export interface Request {
    authorId: string;
    answerId: string;
    content: string;
  }

  export interface Response {}
}

/**
 * Caso de uso responsável por atualizar os dados de uma questão.
 *
 * Regras:
 * - A questão deve existir
 * - Apenas o autor pode atualizá-la
 */
export class UpdateAnswerUseCase extends AbstractUseCase<
  AnswerRepository,
  UpdateAnswer.Response,
  UpdateAnswer.Request
> {
  constructor(private readonly answerRepository: AnswerRepository) {
    super(answerRepository);
  }

  async execute({
    authorId,
    answerId,
    content,
  }: UpdateAnswer.Request): Promise<UpdateAnswer.Response> {
    // 1. Busca a questão pelo ID
    const answer = await this.answerRepository.findById(answerId);

    // 2. Valida se existe
    if (!answer) {
      throw new BadRequestError("Answer not found.");
    }

    // 3. Garante que somente o autor possa editar
    const isOwner = answer.authorId.getValue() === authorId;
    if (!isOwner) {
      throw new NotAllwedError("You are not allowed to update this answer.");
    }

    // 4. Atualiza o estado do agregado (Domain-Driven)
    answer.content = content;

    // 5. Persiste as mudanças no repositório
    await this.answerRepository.update(answer);

    return {};
  }
}
