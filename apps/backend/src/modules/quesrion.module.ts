import { Module } from "@nestjs/common";
import { QuestionCreateController } from "src/modules/question/controller/question-create.controller";

import { JwtStrategy } from "./auth/strategy/jwt.strategy";
import { DatabaseModule } from "./database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [QuestionCreateController],
  providers: [JwtStrategy],
  exports: []
})
export class QuestionModule { }
