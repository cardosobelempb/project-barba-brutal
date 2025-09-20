import { Body, Controller, Post } from '@nestjs/common';
import { AuthResetService } from '@repo/auth';

import type { AuthSignInProps } from '@repo/types';
import { AuthSignInPresenter } from '@repo/types';
import { sign } from 'jsonwebtoken';

@Controller('/auth')
export class AuthResetController {
  constructor(private readonly authResetService: AuthResetService) {}

  @Post('/reset')
  async handle(@Body() request: AuthSignInProps): Promise<AuthSignInPresenter> {
    const { email, password } = request;
    const user = await this.authResetService.execute({ email, password });
    const jwtSecret = process.env.JWT_SECRET;

    return {
      user: AuthSignInPresenter.toHTTP(user),
      accessToken: sign(AuthSignInPresenter.toHTTP(user), jwtSecret as string, {
        expiresIn: '15d',
      }),
    };
  }
}
