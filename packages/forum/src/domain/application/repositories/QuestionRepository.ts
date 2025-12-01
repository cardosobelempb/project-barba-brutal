import { RepositoryAbstract } from "@repo/core";

import { Question } from "../../enterprise/entities";

export abstract class QuestionRepository extends RepositoryAbstract<Question> {
  abstract findBySlug(slug: string): Promise<Question | null>;
}
