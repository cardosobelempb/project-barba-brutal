import { Pagination, RepositoryAbstract } from "@repo/core";

import { Answer } from "../../enterprise/entities";

export abstract class AnswerRepository extends RepositoryAbstract<Answer> {
  abstract findManyByQuestionId(questionId: string, params: Pagination): Promise<Answer[]>
}
