import { Body, Controller, Post } from '@nestjs/common';
import { AuthSignInService } from '@repo/auth';
import { JwtAbstract } from '@repo/core';

import type { SignInDTO, TokenDTO } from '@repo/types';
import { AuthSignInPresenter } from '@repo/types';


@Controller('authentication')
export class AuthenticationController {
  constructor(
    private authSignInService: AuthSignInService,
    private jwtAdapter: JwtAbstract<TokenDTO>
  ) { }

  @Post('login')
  async login(@Body() body: SignInDTO): Promise<AuthSignInPresenter> {
    const { email, password } = body;

    const user = await this.authSignInService.execute({
      email,
      password,
    });

    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const payload: TokenDTO = { user: { name: user.name, email: user.email, userId: user.id.getValue(), barber: user.barber, role: user.role } };

    const accessToken = await this.jwtAdapter.createAsyncAccessToken(payload);
    const refreshToken = await this.jwtAdapter.createAsyncRefreshToken(payload);

    return {
      user: AuthSignInPresenter.toHTTP(user),
      access_token: accessToken,
      refresh_token: refreshToken
    };
  }
}
