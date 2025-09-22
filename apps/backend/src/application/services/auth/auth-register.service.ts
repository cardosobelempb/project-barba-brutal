import { UserEntity } from '@repo/types';
import { UserRepository } from '@repo/user';

export class AuthRegisterService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(entity: UserEntity): Promise<void> {
    await this.userRepository.create(entity);
  }
}
