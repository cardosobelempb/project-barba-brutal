import { AbstractUseCase, Either, ErrorCode, left, NotAllwedError, NotFoundError, right, UUIDVO } from "@repo/core";

import { Answer, AnswerAttachment, AnswerAttachmentList } from "../../../enterprise";
import { AnswerAttachmentRepository, AnswerRepository } from "../../repositories";

export namespace UpdateAnswer {
  export interface Request {
    authorId: string;
    answerId: string;
    content: string;
    attachmentsIds: string[];
  }

  export type Response = Either<
    NotFoundError | NotAllwedError,
    {
      answer: Answer;
    }
  >;
}

/**
 * Caso de uso responsável por atualizar os dados de uma questão.
 *
 * Regras:
 * - A questão deve existir
 * - Apenas o autor pode atualizá-la
 */
export class UpdateAnswerUseCase extends AbstractUseCase<
  {
    answerRepository: AnswerRepository;
    answerAttachmentRepository: AnswerAttachmentRepository;
  },
  UpdateAnswer.Response,
  UpdateAnswer.Request
> {
  async execute({
    authorId,
    answerId,
    content,
    attachmentsIds,
  }: UpdateAnswer.Request): Promise<UpdateAnswer.Response> {
    // 1. Busca a questão pelo ID
    const { answerRepository, answerAttachmentRepository } = this.deps;
    const answer = await answerRepository.findById(answerId);

    // 2. Valida se existe
    if (!answer) {
      return left(new NotFoundError(ErrorCode.NOT_FOUND));
    }

    // 3. Garante que somente o autor possa editar
    const isAuthor = answer.authorId.getValue() === authorId;
    if (!isAuthor) {
      return left(new NotAllwedError(ErrorCode.NOT_ALLOWED));
    }

    const currentAnswerAttatchments =
      await answerAttachmentRepository.findManyByAnswerId(answerId);
    const answerAttachementList = new AnswerAttachmentList(
      currentAnswerAttatchments,
    );

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: UUIDVO.create(attachmentId),
        answerId: answer.id,
      });
    });

    // 4. Atualiza o estado do agregado (Domain-Driven)
    answerAttachementList.update(answerAttachments);
    answer.updateAttachments(answerAttachementList);
    answer.content = content;

    // 5. Persiste as mudanças no repositório
    await answerRepository.update(answer);

    return right({ answer });
  }
}
