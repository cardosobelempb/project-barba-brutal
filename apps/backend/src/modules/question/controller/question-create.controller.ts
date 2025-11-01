import { Controller, Post, UseGuards } from "@nestjs/common";
import { UserEntity } from "@repo/types";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { User } from "src/modules/user/decorators/user.decorator";

@Controller("questions")
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuestionCreateController {
  constructor() { }

  @Post()
  // @Roles(Role.ADMIN, Role.USER)
  async handle(@User("email") data: { user: UserEntity; accessToken?: string; refreshToken?: string }) {
    console.log(data)
    return "ok"
  }
}
