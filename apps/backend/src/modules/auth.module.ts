import { Module } from '@nestjs/common';

import { AuthRegisterController } from 'src/infra/controllers/auth/auth-register.controller';
import { AuthSignInController } from 'src/infra/controllers/auth/auth-signin.controller';

import { UserRepository } from 'src/application/repositories/UserRepository';
import { AuthRegisterService } from 'src/application/services/auth/auth-register.service';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthRegisterController, AuthSignInController],
  providers: [
    {
      provide: AuthRegisterService,
      useFactory: (userRespository: UserRepository) => {
        return new AuthRegisterService(userRespository);
      },
      inject: ['UserRepository'],
    },
  ],
})
export class AuthModule {}
