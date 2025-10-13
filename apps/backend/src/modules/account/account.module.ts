import { Module } from "@nestjs/common";
import { BcryptAdapter } from "src/modules/auth/adapters/BcryptAdapter";
import { PrismaService } from "src/shared/application/database/prisma.service";

import { RegisterAccountControlle } from "./controller/register-account.controller";

@Module({
  imports: [],
  controllers: [RegisterAccountControlle],
  providers: [PrismaService, BcryptAdapter]
})
export class AccountModule { }
