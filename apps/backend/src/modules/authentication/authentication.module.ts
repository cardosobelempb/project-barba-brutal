import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthSignInService } from '@repo/auth';
import { HashComparer, JwtAbstract } from '@repo/core';
import { UserRepository } from '@repo/user';
import { USER_PRISMA_REPOSITORY } from 'src/application/repositories/prima/UserPrismaRepository';
import { HASH_COMPARER } from 'src/infra/adapters/BcryptAdapter';
import { JWT_ADAPTER, JwtAdapter } from 'src/infra/adapters/JwtAdapter';

import { DatabaseModule } from '../database.module';
import { HashModule } from '../hasher.module';
import { EnvZod } from './../../shared/schemas/envZod.schema';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [
  DatabaseModule,
    HashModule,
    PassportModule,
    JwtModule.registerAsync({
      global: true,
       useFactory(config: ConfigService<EnvZod, true>) {
        const PRIVATE_KEY = config.get<string>('JWT_PRIVATE_KEY');
        const PUBLIC_KEY = config.get<string>('JWT_PUBLIC_KEY');
        const EXPIRES_IN = config.get<string>('JWT_EXPIRES_IN') || '1h';

        if (!PRIVATE_KEY) {
          throw new Error('JWT_PRIVATE_KEY is missing');
        }

        console.log('PRIVATE KEY LOADED:', PRIVATE_KEY);

        return {
          privateKey: Buffer.from(PRIVATE_KEY, 'base64'),
          publicKey: Buffer.from(PUBLIC_KEY, 'base64'),
          signOptions: {
            algorithm: 'RS256',
            expiresIn: EXPIRES_IN,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
  JwtAdapter,
    {
      provide: JWT_ADAPTER,
      useFactory: (jwtService: JwtService) => new JwtAdapter(jwtService),
      inject: [JwtService],
    },
    {
      provide: JwtAbstract,
      useExisting: JWT_ADAPTER,
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
  exports: [JWT_ADAPTER, JwtAbstract],
})
export class AuthenticationModule {}
