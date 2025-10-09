import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_ADAPTER, JwtAdapter } from 'src/infra/adapters/JwtAdapter';

@Module({
  providers: [
    JwtService,
    { provide: JWT_ADAPTER, useClass: JwtAdapter }
  ],
  exports: [JWT_ADAPTER],
})
export class SecretModule {}
