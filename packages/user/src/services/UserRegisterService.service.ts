import { BadRequestError, ErrorConstants, HashGenerator, ServiceAbstract } from '@repo/core';

import type { UserCreateDTO } from '@repo/types';
import { UserEntity } from '@repo/types';
import { UserRepository } from '../repositories';


export class UserRegisterService implements ServiceAbstract<UserCreateDTO, UserEntity> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashGenerator: HashGenerator
  ) { }

  async execute(entity: UserCreateDTO): Promise<any> {
    const userExists = await this.userRepository.findByEmail(entity.email)

    if (userExists) {
      throw new BadRequestError(ErrorConstants.CONFLICT_ERROR)
    }

    const hashGenerator = await this.hashGenerator.hash(entity.password)

    const user = UserEntity.create({
      ...entity,
      password: hashGenerator
    })

    return await this.userRepository.createResponse(user)


  }

}
