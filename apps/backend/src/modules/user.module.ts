import { Module } from '@nestjs/common';
import { HashGenerator } from '@repo/core';
import {
  UserFindByIdService,
  UserRegisterService,
  UserRepository,
} from '@repo/user';
import { USER_PRISMA_REPOSITORY } from 'src/application/repositories/prima/UserPrismaRepository';
import { HASH_GENERATER } from 'src/infra/BcryptHasher/bcrypt-hasher';
import { UserRegisterController } from 'src/infra/controllers/user/UserRegisterController';

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
    {
      provide: UserFindByIdService,
      useFactory: (userRepository: UserRepository) => {
        return new UserFindByIdService(userRepository);
      },
      inject: [USER_PRISMA_REPOSITORY],
    },
  ],
  exports: [UserFindByIdService],
})
export class UserModule {}
