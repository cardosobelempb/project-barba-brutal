import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthRegisterService, AuthSignInService } from '@repo/auth';
import { HashComparer, HashGenerator } from '@repo/core';
import { UserRepository } from '@repo/user';
import { USER_PRISMA_REPOSITORY } from 'src/application/repositories/prima/UserPrismaRepository';
import { HASH_COMPARER, HASH_GENERATOR } from 'src/infra/adapters/BcryptAdapter';
// import { AuthMeController } from 'src/infra/adapters/JwtAdapter';
import { AuthMeController } from 'src/infra/controllers/auth/auth-me.controller';
import { AuthRegisterController } from 'src/infra/controllers/auth/auth-register.controller';
import { AuthSignInController } from 'src/infra/controllers/auth/auth-signin.controller';
import { AuthController } from 'src/infra/controllers/auth/auth.controller';
import { EnvZod } from 'src/shared/schemas/envZod.schema';

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
    PassportModule,
    JwtModule.registerAsync({
      global: true,
      useFactory(config: ConfigService<EnvZod, true>) {
        const PRIVATE_KEY = config.get<string>('JWT_PRIVATE_KEY');
        const EXPIRES_IN = config.get<string>('JWT_EXPIRES_IN') || '1h';

        if (!PRIVATE_KEY) {
          throw new Error('JWT_PRIVATE_KEY is missing');
        }

        console.log('PRIVATE KEY LOADED:', PRIVATE_KEY.slice(0, 20), '...');

        return {
          privateKey: Buffer.from(PRIVATE_KEY, 'base64'),
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
    AuthController,
    AuthMeController,
  ],
  providers: [
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

