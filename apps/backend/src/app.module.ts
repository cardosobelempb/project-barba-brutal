import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AccountModule } from './modules/account/account.module';
import { DatabaseModule } from './modules/database.module';
import { QuestionModule } from './modules/question/question.module';
import { SettingsModule } from './modules/settings/settings.module';
import { UserModule } from './modules/user/user.module';
import { envZodSchema } from './shared/schemas/envZod.schema';

@Module({
  imports: [ConfigModule.forRoot({
    validate: (env) => envZodSchema.parse(env),
    isGlobal: true
  }), SettingsModule, AccountModule, UserModule, DatabaseModule, QuestionModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
