import { Pagination } from '@repo/core';
import { UserEntity } from '@repo/types';
import { UserRepository } from '@repo/user';
import { PrismaService } from 'src/application/services/database/prisma.service';

export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return user;
  }
  async findById(id: string): Promise<UserEntity | null> {
    const entity = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!entity) return null;

    return entity;
  }
  async findAll({ page }: Pagination): Promise<UserEntity[]> {
    return await this.prismaService.user.findMany();
  }
  // async create(entity: UserEntity): Promise<void> {
  //   await this.prismaService.user.create({ data: entity });
  // }

  async create(entity: UserEntity): Promise<void> {
    await this.prismaService.user.create({ data: entity });
  }

  update(entity: UserEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async delete(entity: UserEntity): Promise<void> {
    await this.prismaService.user.delete({ where: { id: entity.id } });
  }
}

export const USER_PRISMA_REPOSITORY = 'UserPrismaRepository';
