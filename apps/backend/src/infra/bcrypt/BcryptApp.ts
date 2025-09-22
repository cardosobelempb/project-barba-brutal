import { HashComparer, HashGenerator } from '@repo/core';
import { compare, hash } from 'bcryptjs';

export class BcryptApp implements HashGenerator, HashComparer {
  private HASH_SALT_LENGTH = 8;

  async hash(plain: string): Promise<string> {
    return await hash(plain, this.HASH_SALT_LENGTH);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return await compare(plain, hash);
  }
}

export const HASH_GENERATER = 'BcryptApp';
export const HASH_COMPARER = 'BcryptApp';
