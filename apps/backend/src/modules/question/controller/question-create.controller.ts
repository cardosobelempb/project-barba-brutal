import { Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";

@Controller("questions")
  @UseGuards(JwtAuthGuard)
export class QuestionCreateController {
  constructor() { }

  @Post()
  async handle() {
    return "ok"
  }
}
