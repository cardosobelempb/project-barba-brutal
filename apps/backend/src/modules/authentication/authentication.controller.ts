import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthSignInService } from '@repo/auth';

import type { SignInDTO } from '@repo/types';
import { AuthSignInPresenter } from '@repo/types';


@Controller('authentication')
export class AuthenticationController {
  constructor(private authSignInService: AuthSignInService, private jwtService: JwtService) {}

  @Post('login')
  async login(@Body() body: SignInDTO): Promise<AuthSignInPresenter> {
    const { email, password } = body;
    console.log(email, password)

    const user = await this.authSignInService.execute({
      email,
      password,
    });

    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const payload = { username: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return {
      user: AuthSignInPresenter.toHTTP(user),
      accessToken
    };
  }
}
