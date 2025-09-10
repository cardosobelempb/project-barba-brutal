import { Module } from '@nestjs/common';
import { AuthRegisterService, AuthSignInService } from '@repo/auth';
import { HashComparer, HashGenerator } from '@repo/core';
import { UserRepository } from '@repo/user';
import { USER_PRISMA_REPOSITORY } from 'src/application/repositories/prima/UserPrismaRepository';
import {
  HASH_COMPARER,
  HASH_GENERATER,
} from 'src/infra/BcryptHasher/bcrypt-hasher';
import { AuthRegisterController } from 'src/infra/controllers/auth/auth-register.controller';
import { AuthSignInController } from 'src/infra/controllers/auth/auth-signin.controller';

import { DatabaseModule } from './database.module';
import { HashModule } from './hasher.module';

@Module({
  imports: [DatabaseModule, HashModule],
  controllers: [AuthRegisterController, AuthSignInController],
  providers: [
    {
      provide: AuthRegisterService,
      useFactory: (
        userRepository: UserRepository,
        hashGenerator: HashGenerator,
      ) => {
        return new AuthRegisterService(userRepository, hashGenerator);
      },
      inject: [USER_PRISMA_REPOSITORY, HASH_GENERATER],
    },
    {
      provide: AuthSignInService,
      useFactory: (
        userRepository: UserRepository,
        hashComparer: HashComparer,
      ) => {
        return new AuthSignInService(userRepository, hashComparer);
      },
      inject: [USER_PRISMA_REPOSITORY, HASH_COMPARER],
    },
  ],
})
export class AuthModule {}
