import {
  AbstractUseCase,
  Either,
  ErrorCode,
  left,
  NotAllwedError,
  NotFoundError,
  right
} from "@repo/core";

import { Question } from "../../../enterprise";
import { AnswerRepository, QuestionRepository } from "../../repositories";

export namespace ChooseQuestionBestAnswer {
  export interface Request {
    authorId: string;
    answerId: string;
    questionId: string;
  }

  export type Response = Either<
    NotFoundError | NotAllwedError,
    { question: Question }
  >;
}

/**
 * Caso de uso responsável por definir a melhor resposta de uma questão.
 *
 * Regras de negócio:
 * - A resposta deve existir;
 * - A questão deve existir;
 * - Apenas o autor da questão pode escolher a melhor resposta.
 *
 * Boas práticas aplicadas:
 * - SRP: cada validação está isolada;
 * - DRY: tratamento consistente de erros;
 * - Não expõe detalhes de infraestrutura (Clean Architecture);
 * - Código altamente legível e semântico.
 */
export class ChooseQuestionBestAnswerUseCase extends AbstractUseCase<
  { answerRepository: AnswerRepository; questionRepository: QuestionRepository },
  ChooseQuestionBestAnswer.Response,
  ChooseQuestionBestAnswer.Request
> {

  async execute({
    answerId,
    authorId,
    questionId
  }: ChooseQuestionBestAnswer.Request): Promise<ChooseQuestionBestAnswer.Response> {

    const { answerRepository, questionRepository } = this.deps;

    // 1. Validação inicial (entrada do use-case)
    const validationError = this.validateInput(authorId, answerId, questionId);
    if (validationError) return validationError;

    // 2. Buscar a resposta
    const answer = await answerRepository.findById(answerId);
    if (!answer) {
      return left(new NotFoundError(ErrorCode.NOT_FOUND));
    }

    // 3. Buscar a questão
    const question = await questionRepository.findById(questionId);
    if (!question) {
      return left(new NotFoundError(ErrorCode.NOT_FOUND));
    }

    // 4. Verificar autorização
    const isAuthor = question.authorId.getValue() === authorId;
    if (!isAuthor) {
      return left(new NotAllwedError(ErrorCode.NOT_ALLOWED));
    }

    // 5. Atualiza o agregado
    question.bestAnswerId = answer.id;

    // 6. Persistir mudança
    await questionRepository.update(question);

    return right({ question });
  }

  /**
   * Valida campos obrigatórios.
   * Mantém o método execute mais limpo.
   */
  private validateInput(
    authorId: string,
    answerId: string,
    questionId: string
  ): ChooseQuestionBestAnswer.Response | null {

    if (!authorId) return left(new NotAllwedError(ErrorCode.UNAUTHORIZED));
    if (!answerId) return left(new NotFoundError(ErrorCode.NOT_FOUND));
    if (!questionId) return left(new NotFoundError(ErrorCode.NOT_FOUND));

    return null;
  }
}
