import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthSignInService } from '@repo/auth';
import { HashComparer } from '@repo/core';
import { UserRepository } from '@repo/user';
import { USER_PRISMA_REPOSITORY } from 'src/application/repositories/prima/UserPrismaRepository';
import { HASH_COMPARER } from 'src/infra/adapters/BcryptAdapter';

import { DatabaseModule } from '../database.module';
import { HashModule } from '../hasher.module';
import { AuthenticationController } from './authentication.controller';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    HashModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
    privateKey: Buffer.from(process.env.JWT_PRIVATE_KEY!, 'base64'),
    publicKey: Buffer.from(process.env.JWT_PUBLIC_KEY!, 'base64'),
    signOptions: {
      algorithm: 'RS256',
      expiresIn: '1h',
    },
  }),
    }),
  ],
  controllers: [AuthenticationController],
  providers: [JwtStrategy, {
      provide: AuthSignInService,
      useFactory: (
        userRepository: UserRepository,
        hashComparer: HashComparer,
      ) => {
        return new AuthSignInService(userRepository, hashComparer);
      },
      inject: [USER_PRISMA_REPOSITORY, HASH_COMPARER],
    },],
})
export class AuthenticationModule {}
