import { Module } from '@nestjs/common';
import {
  BcryptHasher,
  HASH_COMPARER,
  HASH_GENERATER,
} from 'src/infra/BcryptHasher/bcrypt-hasher';

@Module({
  providers: [
    { provide: HASH_COMPARER, useClass: BcryptHasher },
    { provide: HASH_GENERATER, useClass: BcryptHasher },
  ],
  exports: [HASH_COMPARER, HASH_GENERATER],
})
export class HashModule {}
