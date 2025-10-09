import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { JwtService } from '@nestjs/jwt';
import { JWT_ADAPTER, JwtAdapter } from 'src/infra/adapters/JwtAdapter';

@Module({
  providers: [
    JwtService,
    { provide: JWT_ADAPTER, useClass: JwtAdapter }
  ],
  exports: [JWT_ADAPTER],
=======

// import { JWT_ADAPTER, JwtAdapter } from 'src/infra/adapters/JwtAdapter';

@Module({
  // providers: [{ provide: JWT_ADAPTER, useClass: JwtAdapter }],
  // exports: [JWT_ADAPTER],
>>>>>>> 76c59092360c13693d66e096b815d5bc4273c6a9
})
export class SecretModule {}
