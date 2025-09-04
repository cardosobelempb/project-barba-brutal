import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthModule } from './modules/auth.module';
import { DatabaseModule } from './modules/database.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
