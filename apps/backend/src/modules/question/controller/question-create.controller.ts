import { Controller, Get, UseGuards } from "@nestjs/common";
import { ParamNumber } from "src/decorators/params/param-number.decorator";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { RolesGuard } from "src/guards/roles.guard";

@Controller("questions")
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuestionCreateController {
  constructor() { }

  @Get(':id')
  // @Roles(Role.ADMIN, Role.USER)
  async handle(@ParamNumber('id') id: number) {

    console.log("User =>", id);
    return "ok"
  }
}
