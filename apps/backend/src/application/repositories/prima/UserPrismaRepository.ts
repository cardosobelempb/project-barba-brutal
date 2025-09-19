import { Pagination } from '@repo/core';
import { UserEntity } from '@repo/types';
import { UserRepository } from '@repo/user';
import { PrismaService } from 'src/application/services/database/prisma.service';

import { UserPrismaMapper } from './mapper/UserPrisma.mapper';

export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    const entity = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!entity) return null;

    return UserPrismaMapper.toDomain(entity);
  }
  async findById(id: string): Promise<UserEntity | null> {
    const entity = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!entity) return null;

    return UserPrismaMapper.toDomain(entity);
  }
  async findAll({ page }: Pagination): Promise<UserEntity[]> {
    const users = await this.prismaService.user.findMany();
    return users.map((user) => UserPrismaMapper.toDomain(user));
  }

  async create(entity: UserEntity): Promise<void> {
    await this.prismaService.user.create({ data: entity });
  }

  async update(entity: UserEntity): Promise<void> {
    await this.prismaService.user.update({
      data: entity,
      where: {
        id: entity.id,
      },
    });
  }

  async delete(entity: UserEntity): Promise<void> {
    await this.prismaService.user.delete({ where: { id: entity.id } });
  }
}

export const USER_PRISMA_REPOSITORY = 'UserPrismaRepository';
