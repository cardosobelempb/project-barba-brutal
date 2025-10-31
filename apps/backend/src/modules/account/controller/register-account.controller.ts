import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { ConflictError, ErrorConstants } from "@repo/core";
import { registerAccountZodSchema } from "src/shared/schemas/registerAccountZod.schema";

import type { RegisterAccountZodSchema } from "src/shared/schemas/registerAccountZod.schema";


import { createZodValidationPipe } from "src/pipes/libs/zod/create-zod-validation.pipe";
import { PrismaService } from "src/shared/application/database/prisma.service";
import { BcryptAdapter } from '../../auth/adapters/BcryptAdapter';

@Controller("/accounts")
export class RegisterAccountControlle {

  constructor(
    private prismaService: PrismaService,
    private readonly bcryptAdapter: BcryptAdapter
  ) { }

  @Post("/register")
  @UsePipes(createZodValidationPipe(registerAccountZodSchema))
  async handle(@Body() body: RegisterAccountZodSchema) {
    const { name, email, password, phone } = body

    const userWithSameEmail = await this.prismaService.user.findUnique({
      where: {
        email
      }
    })

    if (userWithSameEmail) {
      console.log("Conflict: User with same email already exists.")
      throw new ConflictError(ErrorConstants.CONFLICT_ERROR)
    }

    const hashedPawword = await this.bcryptAdapter.hash(password)

    await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPawword,
        phone
      }
    })
  }
}
