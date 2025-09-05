import { Module } from '@nestjs/common';
import { UserPrismaRepository } from 'src/application/repositories/prima/UserPrismaRepository';
import { PrismaService } from 'src/application/services/database/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'UserRepository',
      useClass: UserPrismaRepository,
    },
    {
      provide: 'UserRepository',
      useFactory: (prismaService: PrismaService) => {
        return new UserPrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
  ],
  exports: [
    PrismaService,
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'UserRepository',
      useClass: UserPrismaRepository,
    },
    {
      provide: 'UserRepository',
      useFactory: (prismaService: PrismaService) => {
        return new UserPrismaRepository(prismaService);
      },
      inject: ['PrismaService'],
    },
  ],
})
export class DatabaseModule {}
