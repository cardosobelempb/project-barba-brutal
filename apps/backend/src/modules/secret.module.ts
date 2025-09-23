import { Module } from '@nestjs/common';
import { JWT_APP, JwtApp } from 'src/infra/jwt/JwtApp';

@Module({
  providers: [{ provide: JWT_APP, useClass: JwtApp }],
  exports: [JWT_APP],
})
export class SecretModule {}
