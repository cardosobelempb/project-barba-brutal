import { Module } from '@nestjs/common';

import {
  BcryptAdapter,
  HASH_COMPARER,
  HASH_GENERATOR,
} from './../infra/bcrypt/BcryptAdapter';

@Module({
  providers: [
    { provide: HASH_COMPARER, useClass: BcryptAdapter },
    { provide: HASH_GENERATOR, useClass: BcryptAdapter },
  ],
  exports: [HASH_COMPARER, HASH_GENERATOR],
})
export class HashModule {}
