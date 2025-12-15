import { BadRequestError, ErrorCode, ServiceAbstract } from '@repo/core';
import { UserEntity } from '@repo/types';

import { UserRepository } from '../repositories';

export class UserFindByIdService implements ServiceAbstract<string, UserEntity> {
  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async execute(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new BadRequestError(ErrorCode.USER_NOT_FOUND)
    }

    return user

  }

}
