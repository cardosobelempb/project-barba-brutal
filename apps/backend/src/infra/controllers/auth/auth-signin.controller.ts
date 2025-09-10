import { Body, Controller, Post } from '@nestjs/common';
import { AuthSignInService } from '@repo/auth';

import type { SignInProps, UserEntity } from '@repo/types';

@Controller('/auth')
export class AuthSignInController {
  constructor(private readonly authSignInService: AuthSignInService) {}

  @Post('/signin')
  async handle(@Body() request: SignInProps): Promise<UserEntity> {
    console.log('AuthSignInController =>');
    const { email, password } = request;
    const user = await this.authSignInService.execute({ email, password });

    console.log(user);

    return { ...user };
  }
}
