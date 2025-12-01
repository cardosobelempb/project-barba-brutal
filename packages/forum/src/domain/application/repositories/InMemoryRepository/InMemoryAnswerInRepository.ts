import { Pagination } from "@repo/core";

import { Answer } from "../../../enterprise/entities";
import { AnswerRepository } from "../AnswerRepository";

export class InMemoryAnswerInRepository implements AnswerRepository {

  public items: Answer[] = [];

  async findById(id: string): Promise<Answer | null> {
    throw new Error("Method not implemented.");
  }
  async findAll(params: Pagination): Promise<Answer[]> {
    throw new Error("Method not implemented.");
  }
  async create(entity: Answer): Promise<void> {
    this.items.push(entity)
  }
  async update(entity: Answer): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async delete(entity: Answer): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
