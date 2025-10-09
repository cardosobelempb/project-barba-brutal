import { Body, Controller, Post } from '@nestjs/common';
import { AuthSignInService } from '@repo/auth';

import type { SignInDTO, UserPayloadDTO } from '@repo/types';
import { AuthSignInPresenter } from '@repo/types';
import { JwtAdapter } from 'src/infra/adapters/JwtAdapter';

@Controller('/auth')
export class AuthSignInController {
  constructor(
    private readonly authSignInService: AuthSignInService,
    private readonly jwtAdapter: JwtAdapter<UserPayloadDTO>,
  ) {}

  @Post('/signin')
  async handle(@Body() request: SignInDTO): Promise<AuthSignInPresenter> {
    const { email, password } = request;

    // Tipagem explícita aqui (evita erro do ESLint)
    const user = await this.authSignInService.execute({
      email,
      password,
    });

    // const accessToken = await this.jwtAdapter.createAsyncAccessToken({
    //   userId: user.id.getValue(),
    //   name: user.name,
    //   email: user.email,
    //   barber: user.barber,
    //   role: user.role,
    // });

    // const refreshToken = await this.jwtAdapter.createAsyncRefreshToken({
    //   userId: user.id.getValue(),
    //   name: user.name,
    //   email: user.email,
    //   barber: user.barber,
    //   role: user.role,
    // });

    return {
      user: AuthSignInPresenter.toHTTP(user),
      // accessToken,
      // refreshToken,
    };
  }
}
