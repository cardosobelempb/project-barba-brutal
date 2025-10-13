import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AccountModule } from './modules/account/account.module';
import { DatabaseModule } from './modules/database.module';
import { QuestionModule } from './modules/quesrion.module';
import { UserModule } from './modules/user/user.module';
import { envZodSchema } from './shared/schemas/envZod.schema';

@Module({
  imports: [ConfigModule.forRoot({
    validate: (env) => envZodSchema.parse(env),
    isGlobal: true
  }), AccountModule, UserModule, DatabaseModule, QuestionModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
