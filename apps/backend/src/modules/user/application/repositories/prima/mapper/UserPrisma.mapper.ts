import { Prisma, User as UserMapper } from '@prisma/client';
import { UUIDVO } from '@repo/core';
import { UserEntity } from '@repo/types';

export class UserPrismaMapper {
  static toDomain(entity: UserMapper): UserEntity {
    return UserEntity.create(
      {
        id: entity.id,
        name: entity.name,
        email: entity.email,
        password: entity.password,
        phone: entity.phone,
        barber: entity.barber,
        role: entity.role ?? [],
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        deletedAt: entity.deletedAt,
      },
      UUIDVO.create(entity.id),
    );
  }

  static toPrisma(entity: UserEntity): Prisma.UserUncheckedCreateInput {
    return {
      id: entity.id.getValue(),
      name: entity.name,
      email: entity.email,
      password: entity.password,
      phone: entity.phone,
      barber: entity.barber,
      role: entity.role ?? 1,
    };
  }
}
