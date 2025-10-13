import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/application/database/prisma.service';

import { USER_PRISMA_REPOSITORY, UserPrismaRepository } from './user/application/repositories/prima/UserPrismaRepository';

@Module({
  providers: [
    PrismaService,

    /**
     * Provedor para o repositório de usuários baseado em Prisma.
     * Usa injeção de dependência explícita com token,
     * facilitando substituição por mocks ou outras implementações.
     */
    {
      provide: USER_PRISMA_REPOSITORY,
      useFactory: (prisma: PrismaService) => new UserPrismaRepository(prisma),
      inject: [PrismaService],
    },
  ],
  exports: [USER_PRISMA_REPOSITORY], // Exporta o repositório via token
})
export class DatabaseModule {}
