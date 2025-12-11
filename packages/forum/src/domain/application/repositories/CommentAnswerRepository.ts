import { Pagination, RepositoryAbstract } from "@repo/core";

import { CommentAnswer } from "../../enterprise/entities";

export abstract class CommentAnswerRepository extends RepositoryAbstract<CommentAnswer> {
  abstract findManyByCommentAnswerId(questionId: string, params: Pagination): Promise<CommentAnswer[]>
}
