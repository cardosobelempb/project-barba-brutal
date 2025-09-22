import { BadRequestError, ErrorConstants, HashGenerator, ServiceAbstract } from '@repo/core';
import { UserEntity } from '@repo/types';
import { UserRepository } from '@repo/user';

export class AuthRegisterService implements ServiceAbstract<UserEntity, UserEntity> {
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

    const user = UserEntity.create({
      ...request,
      password: hashGenerator,
      barber: request.barber || false,
      name: request.name,
      email: request.email,
      phone: request.phone
    })

    await this.userRepository.create(user)

  }

}
