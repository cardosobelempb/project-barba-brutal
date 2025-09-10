import { BadRequestError, ErrorConstants, HashGenerator, ServiceAbstract } from '@repo/core';
import { UserEntity } from '@repo/types';

import { UserRepository } from '../repositories';

export class UserRegisterService implements ServiceAbstract<UserEntity, UserEntity> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashGenerator: HashGenerator
  ) { }

  async execute(request: UserEntity): Promise<any> {
    const userExists = await this.userRepository.findByEmail(request.email)

    if (userExists) {
      throw new BadRequestError(ErrorConstants.CONFLICT_ERROR)
    }

    const hashGenerator = await this.hashGenerator.hash(request.password)

    await this.userRepository.create({ ...request, password: hashGenerator, barber: false })

  }

}
