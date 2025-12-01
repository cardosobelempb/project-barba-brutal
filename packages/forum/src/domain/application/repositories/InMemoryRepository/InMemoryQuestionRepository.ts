import { Pagination } from "@repo/core";

import { Question } from "../../../enterprise/entities";
import { QuestionRepository } from "../QuestionRepository";

export class InMemoryQuestionRepository implements QuestionRepository {

  public items: Question[] = [];

  async findById(id: string): Promise<Question | null> {
    throw new Error("Method not implemented.");
  }
  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find(item => item.slug.getValue() === slug);

    if(!question){
      return null;
    }

    return question;
  }
  async findAll(params: Pagination): Promise<Question[]> {
    throw new Error("Method not implemented.");
  }
  async create(entity: Question): Promise<void> {
    this.items.push(entity);
  }
  async update(entity: Question): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async delete(entity: Question): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
