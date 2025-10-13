import { ErrorConstants, HashComparer, ServiceAbstract, UnauthorizedError } from '@repo/core';
import { SignInDTO, UserEntity } from '@repo/types';
import { UserRepository } from '@repo/user';

export class AuthSignInService implements ServiceAbstract<SignInDTO, UserEntity> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashComparer: HashComparer,
  ) { }

  async execute({ email, password }: SignInDTO): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) throw new UnauthorizedError(ErrorConstants.INVALID_CREDENTIALS)

    const hashComparer = await this.hashComparer.compare(password, user.password)

    if (!hashComparer) throw new UnauthorizedError(ErrorConstants.INVALID_CREDENTIALS)

    return user

  }

}
