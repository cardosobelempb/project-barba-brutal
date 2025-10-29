import { Module } from "@nestjs/common";
import { QuestionCreateController } from "src/modules/question/controller/QuestionCreate.controller";

import { JwtAdapter } from "../auth/adapters/JwtAdapter";
import { SettingsModule } from "../settings/settings.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [SettingsModule, UserModule],
  controllers: [QuestionCreateController],
  providers: [JwtAdapter],
  exports: []
})
export class QuestionModule { }
