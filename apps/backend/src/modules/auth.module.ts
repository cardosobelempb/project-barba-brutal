import { Module } from '@nestjs/common';
import { AuthRegisterService } from 'src/infra/application/services/auth/auth-register.service';
import { PrismaService } from 'src/infra/application/services/database/prisma.service';
import { AuthRegisterController } from 'src/infra/controllers/auth/auth-register.controller';
import { AuthSignInController } from 'src/infra/controllers/auth/auth-signin.controller';

import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthRegisterController, AuthSignInController],
  providers: [
    {
      provide: AuthRegisterService,
      useFactory: (prismaService: PrismaService) => {
        return new AuthRegisterService(prismaService);
      },
      inject: [PrismaService],
    },
  ],
})
export class AuthModule {}
