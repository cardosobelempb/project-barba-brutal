import { Module } from "@nestjs/common";
import { PrismaService } from "src/application/database/prisma.service";
import { RegisterAccountControlle } from "src/infra/controllers/account/register-account.controller";

import { DatabaseModule } from "./database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [RegisterAccountControlle],
  providers: [PrismaService]
})
export class AccountModule { }
