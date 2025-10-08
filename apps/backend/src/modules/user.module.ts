import { forwardRef, Module } from '@nestjs/common';
import { HashGenerator } from '@repo/core';
import { UserFindByIdService, UserRegisterService, UserRepository } from '@repo/user';
import { USER_PRISMA_REPOSITORY } from 'src/application/repositories/prima/UserPrismaRepository';
import { HASH_GENERATOR } from 'src/infra/adapters/BcryptAdapter';
import { UserRegisterController } from 'src/infra/controllers/user/UserRegisterController';

// import { AuthModule } from 'src/infra/adapters/JwtAdapter';
import { AuthModule } from './auth.module';
import { DatabaseModule } from './database.module';
import { HashModule } from './hasher.module';

@Module({
  imports: [DatabaseModule, HashModule, forwardRef(() => AuthModule)],
  controllers: [UserRegisterController],
  providers: [
    // JwtAdapter,
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
