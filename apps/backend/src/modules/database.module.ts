import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/application/services/database/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
  ],
  exports: [
    PrismaService,
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
  ],
})
export class DatabaseModule {}
