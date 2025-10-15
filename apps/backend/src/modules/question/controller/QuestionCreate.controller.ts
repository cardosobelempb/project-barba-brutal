import { Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Role, UserEntity } from "@repo/types";
import { Roles } from "src/modules/auth/decorators/roles.decorator";

import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { User } from "src/modules/user/decorators/user.decorator";

@Controller("questions")
@UseGuards(AuthGuard, RolesGuard)
export class QuestionCreateController {
  constructor() { }

  @Post()
  @Roles(Role.ADMIN)
  async handle(@User() user: UserEntity) {
    console.log(user)
    return "ok"
  }
}
