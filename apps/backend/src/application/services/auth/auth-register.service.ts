import { UserEntity } from '@repo/user';
import { UserRepository } from 'src/application/repositories/UserRepository';

export class AuthRegisterService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(entity: UserEntity): Promise<void> {
    await this.userRepository.create({ ...entity, barber: false });
  }
}
