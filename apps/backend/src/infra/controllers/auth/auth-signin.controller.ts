import { Body, Controller, Post } from '@nestjs/common';
import { AuthSignInService } from '@repo/auth';

import type { SignInDTO } from '@repo/types';
import { AuthSignInPresenter } from '@repo/types';
import { JwtApp } from 'src/infra/jwt/JwtApp';

@Controller('/auth')
export class AuthSignInController {
  constructor(
    private readonly authSignInService: AuthSignInService,
    private readonly jwtApp: JwtApp<{ userId: string; email: string }>,
  ) {}

  @Post('/signin')
  async handle(@Body() request: SignInDTO): Promise<AuthSignInPresenter> {
    const { email, password } = request;
    const user = await this.authSignInService.execute({ email, password });
    // const jwtSecret = process.env.JWT_SECRET;

    return {
      user: AuthSignInPresenter.toHTTP(user),
      accessToken: this.jwtApp.createAccessToken({
        userId: user.id.getValue(),
        email: user.email,
      }),
      refreshToken: this.jwtApp.createRefreshToken({
        userId: user.id.getValue(),
        email: user.email,
      }),
    };
  }
}
