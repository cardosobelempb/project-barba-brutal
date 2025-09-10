import { Module } from '@nestjs/common';
import {
  USER_PRISMA_REPOSITORY,
  UserPrismaRepository,
} from 'src/application/repositories/prima/UserPrismaRepository';
import { PrismaService } from 'src/application/services/database/prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: USER_PRISMA_REPOSITORY, // O token constante para o UserRepository
      useFactory: (prismaService: PrismaService) => {
        return new UserPrismaRepository(prismaService);
      },
      inject: [PrismaService], // Injetando o PrismaService
    },
  ],
  exports: [USER_PRISMA_REPOSITORY],
})
export class DatabaseModule {}
