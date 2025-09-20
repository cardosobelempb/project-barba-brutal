import { RepositoryAbstract } from '@repo/core';
import { UserEntity } from '@repo/types';

export abstract class UserRepository extends RepositoryAbstract<UserEntity> {
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract passwordUpdate(entity: UserEntity): Promise<void>;
}
