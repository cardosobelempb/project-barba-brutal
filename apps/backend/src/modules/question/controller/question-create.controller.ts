import { Controller, Post, UseGuards } from "@nestjs/common";
import { UserV1 } from "src/decorators/userv2.decorator";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { RolesGuard } from "src/guards/roles.guard";


@Controller("questions")
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuestionCreateController {
  constructor() { }

  @Post()
  // @Roles(Role.ADMIN, Role.USER)
  async handle(@UserV1("email") email: string) {
    console.log("User 02 =>", email);
    return "ok"
  }
}
