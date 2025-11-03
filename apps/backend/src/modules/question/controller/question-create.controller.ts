import { Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { RolesGuard } from "src/guards/roles.guard";


@Controller("questions")
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuestionCreateController {
  constructor() { }

  @Post()
  // @Roles(Role.ADMIN, Role.USER)
  async handle() {
    console.log("ok")
    return "ok"
  }
}
