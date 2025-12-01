import { Module } from "@nestjs/common";

import { JwtAdapter } from "../../adapters/JwtAdapter";
import { SettingsModule } from "../settings/settings.module";
import { UserModule } from "../user/user.module";
import { QuestionCreateController } from "./controller/QuestionCreate.controller";

@Module({
  imports: [SettingsModule, UserModule],
  controllers: [QuestionCreateController],
  providers: [JwtAdapter],
  exports: []
})
export class ForumModule { }
