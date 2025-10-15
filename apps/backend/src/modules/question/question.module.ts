import { Module } from "@nestjs/common";
import { QuestionCreateController } from "src/modules/question/controller/QuestionCreate.controller";

import { JwtStrategy } from "../auth/strategy/jwt.strategy";
import { SettingsModule } from "../settings/settings.module";

@Module({
  imports: [SettingsModule],
  controllers: [QuestionCreateController],
  providers: [JwtStrategy],
  exports: []
})
export class QuestionModule { }
