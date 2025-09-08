import { ServiceRoot } from '@repo/core';
import { UpdateProps, UserProps } from '@repo/types';

export class UserRegisterService implements ServiceRoot<UserProps, UpdateProps> {
  execute(request: UserProps): Promise<UserProps | null> {
    console.log('UserRegisterService =>')
    throw new Error('Method not implemented.');
  }

}
