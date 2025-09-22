import { HashComparer, ServiceAbstract } from '@repo/core';
import { UserEntity } from '@repo/types';
import { UserRepository } from '@repo/user';

export class AuthResetService implements ServiceAbstract<UserEntity, void> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashComparer: HashComparer
  ) { }

  async execute(entity : UserEntity): Promise<void> {

    //TODO: Validar o token

   await this.userRepository.passwordUpdate(entity)


  }

}
