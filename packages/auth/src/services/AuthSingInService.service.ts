import { BadRequestError, ErrorConstants, HashComparer, ServiceAbstract } from '@repo/core';
import { AuthSignInProps, UserEntity } from '@repo/types';
import { UserRepository } from '@repo/user';

export class AuthSignInService implements ServiceAbstract<AuthSignInProps, UserEntity> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashComparer: HashComparer
  ) { }

  async execute({email, password}: AuthSignInProps): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) throw new BadRequestError(ErrorConstants.INVALID_CREDENTIALS)

    const hashComparer = await this.hashComparer.compare(password, user.password)

    if (!hashComparer) throw new BadRequestError(ErrorConstants.INVALID_CREDENTIALS)

   return user

  }

}
