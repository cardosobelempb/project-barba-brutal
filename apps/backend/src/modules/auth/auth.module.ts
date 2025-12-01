import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AUTH_REGISTER_SERVICE, AUTH_SIGN_IN_SERVICE, AuthRegisterService, AuthSignInService } from '@repo/auth';
import { HashComparer, HashGenerator } from '@repo/core';
// import { AuthMeController } from 'src/infra/adapters/JwtAdapter';
import { AuthMeController } from 'src/modules/auth/controllers/auth-me.controller';
import { AuthRegisterController } from 'src/modules/auth/controllers/auth-register.controller';
import { AuthSignInController } from 'src/modules/auth/controllers/auth-signin.controller';
import { ENVIRONMENT_ZOD_SCHEMA } from 'src/modules/settings/env/env.zod';

import { HASH_COMPARER, HASH_GENERATOR } from '../../adapters/BcryptAdapter';
import { JWT_ADAPTER, JwtAdapter } from '../../adapters/JwtAdapter';
import { DatabaseModule } from '../database/database.module';
import { HashModule } from '../hasher.module';
import { SecretModule } from '../secret.module';
import { USER_PRISMA_REPOSITORY, UserPrismaRepository } from '../user/application/repositories/prima/UserPrismaRepository';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    HashModule,
    DatabaseModule,
    SecretModule,
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.registerAsync({
      global: true,
       useFactory(config: ConfigService<ENVIRONMENT_ZOD_SCHEMA, true>) {
        const PRIVATE_KEY = config.get<string>('JWT_PRIVATE_KEY');
        // const PUBLIC_KEY = config.get<string>('JWT_PUBLIC_KEY');
        const EXPIRES_IN = config.get<number>('JWT_EXPIRES_IN') || '1h';

        if (!PRIVATE_KEY) {
          throw new Error('JWT_PRIVATE_KEY is missing');
        }

        return {
          privateKey: Buffer.from(PRIVATE_KEY, 'base64'),
          // publicKey: Buffer.from(PUBLIC_KEY, 'base64'),
          signOptions: {
            algorithm: 'RS256',
            expiresIn: EXPIRES_IN,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [
    AuthRegisterController,
    AuthSignInController,
    AuthMeController,
  ],
  providers: [
    JwtStrategy,
    {
      provide: JWT_ADAPTER,
      useFactory: (
        jwtService: JwtService
      ) => {
        return new JwtAdapter(jwtService);
      },
      inject: [JwtService],
    },
    {
      provide: AUTH_REGISTER_SERVICE,
      useFactory: (
        userPrismaRepository: UserPrismaRepository,
        hashGenerator: HashGenerator,
      ) => {
        return new AuthRegisterService(userPrismaRepository, hashGenerator);
      },
      inject: [USER_PRISMA_REPOSITORY, HASH_GENERATOR],
    },
    {
      provide: AUTH_SIGN_IN_SERVICE,
      useFactory: (
        userPrismaRepository: UserPrismaRepository,
        hashComparer: HashComparer,
      ) => {
        return new AuthSignInService(userPrismaRepository, hashComparer);
      },
      inject: [USER_PRISMA_REPOSITORY, HASH_COMPARER],
    },
  ],
})
export class AuthModule {}

