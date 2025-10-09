import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthRegisterService } from '@repo/auth';
import { AuthRegisterPresenter } from '@repo/types';
import { JwtAdapter } from 'src/infra/adapters/JwtAdapter';

import type { AuthRegisterDTO, UserPayloadDTO } from '@repo/types';

@Controller('/auth')
export class AuthRegisterController {
  constructor(
    private readonly authRegisterService: AuthRegisterService,
    private readonly jwtAdapter: JwtAdapter<UserPayloadDTO>,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async handle(
    @Body() entity: AuthRegisterDTO,
  ): Promise<AuthRegisterPresenter> {
    const user = await this.authRegisterService.execute(entity);

    return {
      user: AuthRegisterPresenter.toHTTP(user),
      accessToken: this.jwtAdapter.createAccessToken({
        name: user.name,
        userId: user.id.getValue(),
        email: user.email,

      }),
      refreshToken: this.jwtAdapter.createRefreshToken({
        name: user.name,
        userId: user.id.getValue(),
        email: user.email,
      }),
    };
  }
}
