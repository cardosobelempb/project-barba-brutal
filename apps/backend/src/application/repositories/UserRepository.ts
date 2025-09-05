import { RepositoryAbstract } from '@repo/core';
import { UserEntity } from '@repo/user';

export abstract class UserRepository extends RepositoryAbstract<UserEntity> {
  abstract findByEmail(email: string): Promise<UserEntity | null>;
}
