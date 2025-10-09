import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AccountModule } from './modules/account.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { DatabaseModule } from './modules/database.module';
import { UserModule } from './modules/user.module';
import { envZodSchema } from './shared/schemas/envZod.schema';

@Module({
  imports: [ConfigModule.forRoot({
    validate: (env) => envZodSchema.parse(env),
    isGlobal: true
  }), AccountModule, AuthenticationModule, UserModule, DatabaseModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
