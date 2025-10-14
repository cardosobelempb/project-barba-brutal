import { Module } from "@nestjs/common";
import { QuestionCreateController } from "src/modules/question/controller/question-create.controller";

import { JwtStrategy } from "../auth/strategy/jwt.strategy";
import { DatabaseModule } from "../database.module";
import { SettingsModule } from "../settings/settings.module";

@Module({
  imports: [DatabaseModule, SettingsModule],
  controllers: [QuestionCreateController],
  providers: [JwtStrategy],
  exports: []
})
export class QuestionModule { }
