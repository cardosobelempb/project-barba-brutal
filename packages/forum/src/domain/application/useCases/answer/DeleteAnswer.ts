import { AbstractUseCase, Either, ErrorCode, left, NotAllwedError, NotFoundError, right } from "@repo/core";

import { AnswerRepository } from "../../repositories";

export namespace DeleteAnswer {
  export interface Request {
    authorId: string;
    answerId: string;
  }

  export type Response = Either<NotFoundError | NotAllwedError, {}>
}

/**
 * Caso de uso responsável por excluir uma resposta (Answer)
 * pertencente ao autor informado.
 *
 * Regras de negócio:
 * - A resposta deve existir;
 * - O autor da requisição deve ser o mesmo autor da resposta.
 */
export class DeleteAnswerUseCase extends AbstractUseCase<
    AnswerRepository,
    DeleteAnswer.Response,
    DeleteAnswer.Request
  > {
    constructor(private readonly answerRepository: AnswerRepository) {
      super(answerRepository);
    }

    async execute({
      authorId,
      answerId,
    }: DeleteAnswer.Request): Promise<DeleteAnswer.Response> {
      // Busca a resposta pelo ID
      const answer = await this.answerRepository.findById(answerId);

      // Valida se a resposta existe
      if (!answer) {
        return left(new NotFoundError(ErrorCode.NOT_FOUND))
      }

      // Valida se o usuário autenticado é realmente o autor da resposta
      const isOwner = answer.authorId.getValue() === authorId;
      if (!isOwner) {
        return left(new NotAllwedError(ErrorCode.NOT_ALLOWED));
      }

      // Executa a remoção da resposta
      await this.answerRepository.delete(answer);

      return right({});

  }
}


/**
  1. Recebemos o authorId e o answerId
  2. Buscamos a resposta no repositório
  3. Se não existir → erro 400
  4. Validamos se o autor da resposta é o usuário da requisição
  5. Se não for → erro 403
  6. Caso válido → deletamos
  7. Retornamos {}
*/
