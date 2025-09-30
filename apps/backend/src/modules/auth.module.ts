import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthRegisterService, AuthSignInService } from '@repo/auth';
import { HashComparer, HashGenerator } from '@repo/core';
import { UserRepository } from '@repo/user';
import { USER_PRISMA_REPOSITORY } from 'src/application/repositories/prima/UserPrismaRepository';
import {
  HASH_COMPARER,
  HASH_GENERATOR,
} from 'src/infra/adapters/BcryptAdapter';
import { JwtAdapter } from 'src/infra/adapters/JwtAdapter';
import { AuthMeController } from 'src/infra/controllers/auth/auth-me.controller';
import { AuthRegisterController } from 'src/infra/controllers/auth/auth-register.controller';
import { AuthSignInController } from 'src/infra/controllers/auth/auth-signin.controller';
import { AuthController } from 'src/infra/controllers/auth/auth.controller';

import { DatabaseModule } from './database.module';
import { HashModule } from './hasher.module';
import { SecretModule } from './secret.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    DatabaseModule,
    HashModule,
    SecretModule,
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: 'mVh2RvqG1hCx7y49QZtq3t41Ew5CLZza',
    }),
  ],
  controllers: [
    AuthRegisterController,
    AuthSignInController,
    AuthController,
    AuthMeController,
  ],
  providers: [
    JwtAdapter,
    {
      provide: AuthRegisterService,
      useFactory: (
        userRepository: UserRepository,
        hashGenerator: HashGenerator,
      ) => {
        return new AuthRegisterService(userRepository, hashGenerator);
      },
      inject: [USER_PRISMA_REPOSITORY, HASH_GENERATOR],
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
