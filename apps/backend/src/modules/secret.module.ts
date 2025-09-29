import { Module } from '@nestjs/common';
import { JWT_ADAPTER, JwtAdapter } from 'src/infra/adapters/JwtAdapter';

@Module({
  providers: [{ provide: JWT_ADAPTER, useClass: JwtAdapter }],
  exports: [JWT_ADAPTER],
})
export class SecretModule {}
