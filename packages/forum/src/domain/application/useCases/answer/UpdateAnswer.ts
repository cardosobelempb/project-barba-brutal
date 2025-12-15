import { AbstractUseCase, Either, ErrorCode, left, NotAllwedError, NotFoundError, right } from "@repo/core";

import { Answer } from "../../../enterprise";
import { AnswerRepository } from "../../repositories";

export namespace UpdateAnswer {
  export interface Request {
    authorId: string;
    answerId: string;
    content: string;
  }

  export type Response = Either<NotFoundError | NotAllwedError, {
    answer: Answer;
  }>
}

/**
 * Caso de uso responsável por atualizar os dados de uma questão.
 *
 * Regras:
 * - A questão deve existir
 * - Apenas o autor pode atualizá-la
 */
export class UpdateAnswerUseCase extends AbstractUseCase<
  { answerRepository: AnswerRepository},
  UpdateAnswer.Response,
  UpdateAnswer.Request
> {

  async execute({
    authorId,
    answerId,
    content,
  }: UpdateAnswer.Request): Promise<UpdateAnswer.Response> {

    // 1. Busca a questão pelo ID
    const { answerRepository} = this.deps;
    const answer = await answerRepository.findById(answerId);

    // 2. Valida se existe
    if (!answer) {
      return left(new NotFoundError(ErrorCode.NOT_FOUND))
    }

    // 3. Garante que somente o autor possa editar
    const isAuthor = answer.authorId.getValue() === authorId;
    if (!isAuthor) {
      return left(new NotAllwedError(ErrorCode.NOT_ALLOWED))
    }

    // 4. Atualiza o estado do agregado (Domain-Driven)
    answer.content = content;

    // 5. Persiste as mudanças no repositório
    await answerRepository.update(answer);

    return right({answer});
  }
}
