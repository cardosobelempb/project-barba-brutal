import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AccountModule } from './modules/account.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { DatabaseModule } from './modules/database.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [AccountModule, AuthenticationModule, UserModule, DatabaseModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
