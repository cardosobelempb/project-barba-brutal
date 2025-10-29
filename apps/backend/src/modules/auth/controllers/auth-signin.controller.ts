import { Body, Controller, Post } from '@nestjs/common';
import { AuthSignInService } from '@repo/auth';

import type { SignInDTO, TokenDTO } from '@repo/types';
import { AuthSignInPresenter } from '@repo/types';
import { JwtAdapter } from 'src/modules/auth/adapters/JwtAdapter';


@Controller('/auth')
export class AuthSignInController {
  constructor(
    private authSignInService: AuthSignInService,
    private jwtAdapter: JwtAdapter<TokenDTO>
  ) { }

  @Post('/signin')
  async handle(@Body() request: SignInDTO): Promise<AuthSignInPresenter> {
    const { email, password } = request;

    // Tipagem explícita aqui (evita erro do ESLint)
    const user = await this.authSignInService.execute({
      email,
      password,
    });

    const payload: TokenDTO = {user:  {name: user.name ,email: user.email, userId: user.id.getValue(), barber: user.barber, role: user.role} };

    const accessToken = await this.jwtAdapter.createAsyncAccessToken(payload);

    const refreshToken = await this.jwtAdapter.createAsyncRefreshToken(payload);

    return {
      user: AuthSignInPresenter.toHTTP(user),
      accessToken,
      refreshToken
    };
  }

}
