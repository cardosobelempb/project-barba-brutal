import { AbstractUseCase, BadRequestError, NotAllwedError } from "@repo/core";

import { Question } from "../../../enterprise";
import { AnswerRepository, QuestionRepository } from "../../repositories";

export namespace ChooseQuestionBestAnswer {
  export interface Request {
    authorId: string;
    answerId: string;
  }

  export interface Response {
    question: Question;
  }
}

/**
 * Caso de uso responsável por definir a melhor resposta de uma questão.
 *
 * Regras:
 * - A resposta deve existir;
 * - A questão relacionada deve existir;
 * - Apenas o autor da questão pode escolher a melhor resposta.
 *
 * Princípios aplicados:
 * - SRP (Single Responsibility): cada etapa validada em métodos privados.
 * - Clean Code: nomes claros e semânticos.
 * - Clean Architecture: usa repositórios (ports) e não depende de infraestrutura.
 */
export class ChooseQuestionBestAnswerUseCase extends AbstractUseCase<
  { answerRepository: AnswerRepository; questionRepository: QuestionRepository },
  ChooseQuestionBestAnswer.Response,
  ChooseQuestionBestAnswer.Request
> {

  /**
   * Método principal: orquestra o fluxo do caso de uso
   * seguindo as regras de negócio declaradas.
   */
  async execute(request: ChooseQuestionBestAnswer.Request): Promise<ChooseQuestionBestAnswer.Response> {
    const { answerRepository, questionRepository } = this.deps;

    this.validateRequest(request);

    // 1. Busca e valida a resposta
    const answer = await this.findAnswerOrFail(answerRepository, request.answerId);

    // 2. Busca e valida a questão
    const question = await this.findQuestionOrFail(questionRepository, answer.questionId.getValue());

    // 3. Verifica autorização
    this.ensureAuthorPermission(question, request.authorId);

    // 4. Atualiza o agregado (DDD)
    question.bestAnswerId = answer.id;

    // 5. Persiste mudança
    await questionRepository.update(question);

    return { question };
  }

  // ---------------------------------------------------------------------------
  // Métodos privados — SRP (Separação de responsabilidade)
  // ---------------------------------------------------------------------------

  /**
   * Validações estruturais do request.
   * Evita processamento desnecessário caso falte algum dado.
   */
  private validateRequest({ authorId, answerId }: ChooseQuestionBestAnswer.Request): void {
    if (!authorId) throw new BadRequestError("authorId is required.");
    if (!answerId) throw new BadRequestError("answerId is required.");
  }

  /**
   * Busca a resposta e lança erro caso não exista.
   */
  private async findAnswerOrFail(repo: AnswerRepository, answerId: string) {
    const answer = await repo.findById(answerId);
    if (!answer) throw new BadRequestError("Answer not found.");
    return answer;
  }

  /**
   * Busca a questão e lança erro caso não exista.
   */
  private async findQuestionOrFail(repo: QuestionRepository, questionId: string) {
    const question = await repo.findById(questionId);
    if (!question) throw new BadRequestError("Question not found.");
    return question;
  }

  /**
   * Garante que apenas o autor da questão possa escolher a melhor resposta.
   */
  private ensureAuthorPermission(question: Question, actorId: string): void {
    const isAuthor = question.authorId.getValue() === actorId;
    if (!isAuthor) throw new NotAllwedError("Action not allowed.");
  }
}
