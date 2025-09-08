import { Module } from '@nestjs/common';
import { UserRegisterController } from 'src/infra/controllers/user/UserRegisterController';

import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserRegisterController],
  providers: [],
})
export class UserModule {}
