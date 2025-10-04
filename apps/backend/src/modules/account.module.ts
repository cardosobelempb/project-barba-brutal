import { Module } from "@nestjs/common";
import { PrismaService } from "src/application/database/prisma.service";
import { BcryptAdapter } from "src/infra/adapters/BcryptAdapter";
import { RegisterAccountControlle } from "src/infra/controllers/account/register-account.controller";

@Module({
  imports: [],
  controllers: [RegisterAccountControlle],
  providers: [PrismaService, BcryptAdapter]
})
export class AccountModule { }
