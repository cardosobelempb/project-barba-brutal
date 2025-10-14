import { Controller, Post, UseGuards } from "@nestjs/common";
import { UserEntity } from "@repo/types";
import { Roles } from "src/modules/auth/decorators/roles.decorator";
import { Role } from "src/modules/auth/enums/role.enum";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { User } from "src/modules/user/decorators/user.decorator";

@Controller("questions")
@UseGuards(JwtAuthGuard)
@Roles(Role.ADMIN)
export class QuestionCreateController {
  constructor() { }

  @Post()
  async handle(@User() user: UserEntity) {
    console.log(user)
    return "ok"
  }
}
