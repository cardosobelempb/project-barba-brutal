import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthSignInService } from '@repo/auth';

import type { SignInDTO } from '@repo/types';
import { AuthSignInPresenter } from '@repo/types';
// import { JwtAdapter } from 'src/infra/adapters/JwtAdapter';

@Controller('/auth')
export class AuthSignInController {
  constructor(
    private readonly authSignInService: AuthSignInService,
    private readonly jwtService: JwtService,
    // private readonly jwtAdapter: JwtAdapter<UserPayloadDTO>,
  ) {}

  @Post('/signin')
  async handle(@Body() request: SignInDTO): Promise<AuthSignInPresenter> {
    const { email, password } = request;

    // Tipagem explícita aqui (evita erro do ESLint)
    const user = await this.authSignInService.execute({
      email,
      password,
    });

    const payload = {
      userId: user.id.getValue(),
      name: user.name,
      email: user.email,
      barber: user.barber,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    const refreshToken = await this.jwtService.signAsync(payload);

    return {
      user: AuthSignInPresenter.toHTTP(user),
      accessToken,
      refreshToken,
    };
  }

}
