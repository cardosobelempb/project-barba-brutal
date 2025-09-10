import { Module } from '@nestjs/common';
import { UserRegisterService, UserRepository } from '@repo/user';
import { USER_PRISMA_REPOSITORY } from 'src/application/repositories/prima/UserPrismaRepository';
import { UserRegisterController } from 'src/infra/controllers/user/UserRegisterController';

import { HashGenerator } from '@repo/core';
import { HASH_GENERATER } from 'src/infra/BcryptHasher/bcrypt-hasher';
import { DatabaseModule } from './database.module';
import { HashModule } from './hasher.module';

@Module({
  imports: [DatabaseModule, HashModule],
  controllers: [UserRegisterController],
  providers: [
    {
      provide: UserRegisterService,
      useFactory: (
        userRepository: UserRepository,
        hashGenerator: HashGenerator,
      ) => {
        return new UserRegisterService(userRepository, hashGenerator);
      },
      inject: [USER_PRISMA_REPOSITORY, HASH_GENERATER],
    },
  ],
})
export class UserModule {}
