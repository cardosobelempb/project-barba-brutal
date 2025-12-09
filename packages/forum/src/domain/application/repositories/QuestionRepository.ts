import { Pagination, RepositoryAbstract } from "@repo/core";

import { Question } from "../../enterprise/entities";

export abstract class QuestionRepository extends RepositoryAbstract<Question> {
  abstract findBySlug(slug: string): Promise<Question | null>;
  abstract findManyRecent(params: Pagination): Promise<Question[]>;
}
