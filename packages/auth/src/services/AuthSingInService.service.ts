import { ErrorConstants, HashComparer, ServiceAbstract, UnauthorizedError } from '@repo/core';
import { AuthSignInProps, UserEntity } from '@repo/types';
import { UserRepository } from '@repo/user';

export class AuthSignInService implements ServiceAbstract<AuthSignInProps, UserEntity> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashComparer: HashComparer
  ) { }

  async execute({email, password}: AuthSignInProps): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email.getValue())

    if (!user) throw new UnauthorizedError(ErrorConstants.INVALID_CREDENTIALS)

    const hashComparer = await this.hashComparer.compare(password.getValue(), user.password)

    if (!hashComparer) throw new UnauthorizedError(ErrorConstants.INVALID_CREDENTIALS)

   return user

  }

}
