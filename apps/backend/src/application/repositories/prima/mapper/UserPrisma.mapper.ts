import { EmailVO, PasswordVO } from '@repo/core';
import { UserEntity } from '@repo/types';

import { Prisma, User as UserMapper } from '../../../../../generated/prisma';

export class UserPrismaMapper {
  static toDomain(entity: UserMapper): UserEntity {
    return {
      id: entity.id,
      name: entity.name,
      email: new EmailVO(entity.email),
      password: new PasswordVO(entity.password),
      phone: entity.phone,
      barber: entity.barber,
    };
  }

  static toPrisma(entity: UserEntity): Prisma.UserUncheckedCreateInput {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email.getValue(),
      password: entity.password.getValue(),
      phone: entity.phone,
      barber: entity.barber,
    };
  }
}
