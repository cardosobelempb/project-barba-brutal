import { BadRequestError, ErrorConstants, HashGenerator, ServiceAbstract } from '@repo/core';
import { AuthRegisterDTO, UserEntity } from '@repo/types';
import { UserRepository } from '@repo/user';

export class AuthRegisterService implements ServiceAbstract<AuthRegisterDTO, UserEntity> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashGenerator: HashGenerator,
  ) { }

  async execute(entity: AuthRegisterDTO): Promise<UserEntity> {
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
