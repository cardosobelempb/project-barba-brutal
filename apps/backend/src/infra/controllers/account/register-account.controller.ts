import { Body, ConflictException, Controller, Post } from "@nestjs/common";
import { ErrorConstants } from "@repo/core";
import { PrismaService } from "src/application/database/prisma.service";

@Controller("/accounts")
export class RegisterAccountControlle {

  constructor(private prismaService: PrismaService){}

  @Post("/register")
  async handle(@Body() body: any) {
    const { name, email, password, phone } = body

    const userWithSameEmail = await this.prismaService.user.findUnique({
      where: {
        email
      }
    })

    if (userWithSameEmail) {
      throw new ConflictException(ErrorConstants.CONFLICT_ERROR)
    }

    await this.prismaService.user.create({
      data: {
        name,
        email,
        password,
        phone
      }
    })
  }
}
