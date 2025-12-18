import { AbstractUseCase, Either, ErrorCode, left, NotAllwedError, NotFoundError, right, UUIDVO } from "@repo/core";

import { Question, QuestionAttachment, QuestionAttachmentList } from "../../../enterprise";
import { QuestionAttachmentRepository, QuestionRepository } from "../../repositories";

export namespace UpdateQuestion {
  export interface Request {
    authorId: string;
    questionId: string;
    title: string;
    content: string;
    attachemntsIds: string[];
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
  {
    questionRepository: QuestionRepository,
    questionAttatchmentRepository: QuestionAttachmentRepository,
  },
  UpdateQuestion.Response,
  UpdateQuestion.Request
> {
  async execute({
    authorId,
    questionId,
    title,
    content,
    attachemntsIds,
  }: UpdateQuestion.Request): Promise<UpdateQuestion.Response> {

    const { questionRepository, questionAttatchmentRepository } = this.deps;
    // 1. Busca a questão pelo ID
    const question = await questionRepository.findById(questionId);

    // 2. Valida se existe
    if (!question) {
      return left( new NotFoundError(ErrorCode.NOT_FOUND));
    }

    // 3. Garante que somente o autor possa editar
    const isAuthor = question.authorId.getValue() === authorId;
    if (!isAuthor) {
      return left( new NotAllwedError(ErrorCode.NOT_ALLOWED));
    }

    const currentQuestionAttatchments = await questionAttatchmentRepository.findManyByQuestionId(questionId);
    const questionAttachementList = new QuestionAttachmentList(currentQuestionAttatchments);

    const questionAttachments = attachemntsIds.map(attachmentId => {
      return QuestionAttachment.create({
        attachmentId: UUIDVO.create(attachmentId),
        questionId: question.id,
      })
    })

    questionAttachementList.update(questionAttachments);

    // 4. Atualiza o estado do agregado (Domain-Driven)
    question.title = title;
    question.content = content;
    question.updateAttachments(questionAttachementList);

    // 5. Persiste as mudanças no repositório
    await questionRepository.update(question);

    return right({question});
  }
}
