import { Body, ConflictException, Controller, Post, UsePipes } from "@nestjs/common";
import { ErrorConstants } from "@repo/core";
import { registerAccountZodSchema } from "src/shared/schemas/registerAccountZod.schema";

import type { RegisterAccountZodSchema } from "src/shared/schemas/registerAccountZod.schema";

import { createZodValidationPipe } from "src/pipes/createZodValidationPipe";
import { PrismaService } from "src/shared/application/database/prisma.service";
import { BcryptAdapter } from '../../auth/adapters/BcryptAdapter';

@Controller("/accounts")
export class RegisterAccountControlle {

  constructor(private prismaService: PrismaService, private readonly bcryptAdapter: BcryptAdapter){}

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
      throw new ConflictException(ErrorConstants.CONFLICT_ERROR)
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
