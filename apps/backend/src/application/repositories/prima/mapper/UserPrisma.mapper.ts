import { UUIDVO } from '@repo/core';
import { UserEntity } from '@repo/types';

import { Prisma, User as UserMapper } from '../../../../../generated/prisma';

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
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        deletedAt: entity.deletedAt || undefined,
      },
      new UUIDVO(entity.id),
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
    };
  }
}
