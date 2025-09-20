import { HashComparer, ServiceAbstract } from '@repo/core';
import { AuthResetProps } from '@repo/types';
import { UserRepository } from '@repo/user';

export class AuthResetService implements ServiceAbstract<AuthResetProps, void> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashComparer: HashComparer
  ) { }

  async execute( {entity} : AuthResetProps): Promise<void> {

    //TODO: Validar o token

   await this.userRepository.passwordUpdate(entity)


  }

}
