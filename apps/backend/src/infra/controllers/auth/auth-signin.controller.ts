import { Body, Controller, Post } from '@nestjs/common';
import { AuthSignInService } from '@repo/auth';

import type { SignInDTO } from '@repo/types';
import { AuthSignInPresenter } from '@repo/types';
import { sign } from 'jsonwebtoken';

@Controller('/auth')
export class AuthSignInController {
  constructor(private readonly authSignInService: AuthSignInService) {}

  @Post('/signin')
  async handle(@Body() request: SignInDTO): Promise<AuthSignInPresenter> {
    const { email, password } = request;
    const user = await this.authSignInService.execute({ email, password });
    const jwtSecret = process.env.JWT_SECRET;

    return {
      user: AuthSignInPresenter.toHTTP(user),
      accessToken: sign(AuthSignInPresenter.toHTTP(user), jwtSecret as string, {
        expiresIn: '15d',
      }),
    };
  }
}
