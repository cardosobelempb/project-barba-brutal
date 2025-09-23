import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthRegisterService } from '@repo/auth';
import { AuthRegisterPresenter } from '@repo/types';
import { JwtApp } from 'src/infra/jwt/JwtApp';

import type { AuthRegisterDTO } from '@repo/types';

@Controller('/auth')
export class AuthRegisterController {
  constructor(
    private readonly authRegisterService: AuthRegisterService,
    private readonly jwtApp: JwtApp<{ userId: string; email: string }>,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async handle(
    @Body() entity: AuthRegisterDTO,
  ): Promise<AuthRegisterPresenter> {
    const user = await this.authRegisterService.execute(entity);

    return {
      user: AuthRegisterPresenter.toHTTP(user),
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
