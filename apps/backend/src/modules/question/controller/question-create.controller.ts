import { Controller, Get, UseGuards } from "@nestjs/common";
import { ParamUser } from "src/decorators/params/param-user.decorator";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { RolesGuard } from "src/guards/roles.guard";

@Controller("questions")
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuestionCreateController {
  constructor() { }

  @Get(':id')
  // @Roles(Role.ADMIN, Role.USER)
  async handle(@ParamUser()  id: string  ) {
    console.log("User =>", id)
    return "ok"
  }
}
