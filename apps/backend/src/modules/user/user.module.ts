import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashGenerator } from '@repo/core';
import { UserFindByIdService, UserRegisterService, UserRepository } from '@repo/user';
import { HASH_GENERATOR } from 'src/modules/auth/adapters/BcryptAdapter';
import { JwtAdapter } from 'src/modules/auth/adapters/JwtAdapter';
import { UserRegisterController } from 'src/modules/user/controller/UserRegisterController';

import { AuthModule } from '../auth/auth.module';
import { HashModule } from '../hasher.module';
import { DatabaseModule } from './../database/database.module';
import { USER_PRISMA_REPOSITORY } from './application/repositories/prima/UserPrismaRepository';

@Module({
  imports: [DatabaseModule, HashModule, forwardRef(() => AuthModule)],
controllers: [UserRegisterController],
  providers: [
    JwtAdapter,
    JwtService,
    {
      provide: UserRegisterService,
      useFactory: (
        userRepository: UserRepository,
        hashGenerator: HashGenerator,
      ) => {
        return new UserRegisterService(userRepository, hashGenerator);
      },
      inject: [USER_PRISMA_REPOSITORY, HASH_GENERATOR],
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
