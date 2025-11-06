import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { ParamUser } from "src/decorators/params/param-user.decorator";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { zodValidationPipe } from "src/pipes/libs/zod/zod-validation.pipe";
import type { UserPayloadZodSchema } from "src/shared/schemas";
import { questionCreateZodSchema, type QuestionCreateZodSchema } from "../lib/questionCreateZod.schema";

@Controller("questions")
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuestionCreateController {
  constructor() { }

  @Post()
    // @Roles(Role.ADMIN, Role.USER)
  // @UsePipes(zodValidationPipe(questionCreateZodSchema))
  async handle(
    @Body(zodValidationPipe(questionCreateZodSchema)) body: QuestionCreateZodSchema,
    @ParamUser() user: UserPayloadZodSchema
  ) {
    console.log("Body =>", body)
    return "ok"
  }
}
