import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthRegisterService, AuthSignInService } from '@repo/auth';
import { HashComparer, HashGenerator } from '@repo/core';
import { UserRepository } from '@repo/user';
// import { AuthMeController } from 'src/infra/adapters/JwtAdapter';
import { AuthMeController } from 'src/modules/auth/controllers/auth-me.controller';
import { AuthRegisterController } from 'src/modules/auth/controllers/auth-register.controller';
import { AuthSignInController } from 'src/modules/auth/controllers/auth-signin.controller';
import { EnvZod } from 'src/shared/schemas/envZod.schema';

import { DatabaseModule } from '../database.module';
import { HashModule } from '../hasher.module';
import { SecretModule } from '../secret.module';
import { USER_PRISMA_REPOSITORY } from '../user/application/repositories/prima/UserPrismaRepository';
import { UserModule } from '../user/user.module';
import { HASH_COMPARER, HASH_GENERATOR } from './adapters/BcryptAdapter';
import { JwtAdapter } from './adapters/JwtAdapter';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    HashModule,
    SecretModule,
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.registerAsync({
      global: true,
       useFactory(config: ConfigService<EnvZod, true>) {
        const PRIVATE_KEY = config.get<string>('JWT_PRIVATE_KEY');
        // const PUBLIC_KEY = config.get<string>('JWT_PUBLIC_KEY');
        const EXPIRES_IN = config.get<string>('JWT_EXPIRES_IN') || '1h';

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
      provide: JwtAdapter,
      useFactory: (
        jwtService: JwtService
      ) => {
        return new JwtAdapter(jwtService);
      },
      inject: [JwtService],
    },
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

