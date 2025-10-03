import { Pagination } from '@repo/core';
import { UserEntity } from '@repo/types';
import { UserRepository } from '@repo/user';
import { PrismaService } from 'src/application/database/prisma.service';

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
    await this.prismaService.user.create({
      data: UserPrismaMapper.toPrisma(entity),
    });
  }

  async createResponse(entity: UserEntity): Promise<UserEntity> {
    const user = await this.prismaService.user.create({
      data: UserPrismaMapper.toPrisma(entity),
    });

    return UserPrismaMapper.toDomain(user);
  }

  async update(entity: UserEntity): Promise<void> {
    await this.prismaService.user.update({
      data: {
        ...entity,
        password: entity.password,
        email: entity.email,
      },
      where: {
        id: entity.id.getValue(),
      },
    });
  }

  async passwordUpdate(entity: UserEntity): Promise<void> {
    await this.prismaService.user.update({
      data: { password: entity.password },
      where: {
        id: entity.id.getValue(),
      },
    });
  }

  async delete(entity: UserEntity): Promise<void> {
    await this.prismaService.user.delete({
      where: { id: entity.id.getValue() },
    });
  }
}

// export const USER_PRISMA_REPOSITORY = 'UserPrismaRepository';
export const USER_PRISMA_REPOSITORY = Symbol('USER_PRISMA_REPOSITORY');

