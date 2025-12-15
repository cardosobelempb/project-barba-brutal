import { AbstractUseCase, Either, ErrorCode, left, NotAllwedError, NotFoundError, right } from "@repo/core";

import { Question } from "../../../enterprise";
import { QuestionRepository } from "../../repositories";

export namespace UpdateQuestion {
  export interface Request {
    authorId: string;
    questionId: string;
    title: string;
    content: string;
  }

  export type Response = Either<NotFoundError | NotAllwedError, {
    question: Question;
  }>
}

/**
 * Caso de uso responsável por atualizar os dados de uma questão.
 *
 * Regras:
 * - A questão deve existir
 * - Apenas o autor pode atualizá-la
 */
export class UpdateQuestionUseCase extends AbstractUseCase<
  QuestionRepository,
  UpdateQuestion.Response,
  UpdateQuestion.Request
> {
  constructor(private readonly questionRepository: QuestionRepository) {
    super(questionRepository);
  }

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: UpdateQuestion.Request): Promise<UpdateQuestion.Response> {
    // 1. Busca a questão pelo ID
    const question = await this.questionRepository.findById(questionId);

    // 2. Valida se existe
    if (!question) {
      return left( new NotFoundError(ErrorCode.NOT_FOUND));
    }

    // 3. Garante que somente o autor possa editar
    const isAuthor = question.authorId.getValue() === authorId;
    if (!isAuthor) {
      return left( new NotAllwedError(ErrorCode.NOT_ALLOWED));
    }

    // 4. Atualiza o estado do agregado (Domain-Driven)
    question.title = title;
    question.content = content;

    // 5. Persiste as mudanças no repositório
    await this.questionRepository.update(question);

    return right({question});
  }
}
