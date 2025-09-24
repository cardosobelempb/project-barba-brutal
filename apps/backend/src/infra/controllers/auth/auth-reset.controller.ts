import { Body, Controller, Post } from '@nestjs/common';
import { AuthResetService } from '@repo/auth';

import type { ResetDTO, UserPayloadDTO } from '@repo/types';
import { UserEntity } from '@repo/types';
import { JwtApp } from 'src/infra/jwt/JwtApp';

@Controller('/auth')
export class AuthResetController {
  constructor(
    private readonly authResetService: AuthResetService,
    private readonly jwtApp: JwtApp<UserPayloadDTO>,
  ) {}

  @Post('/reset')
  async handle(@Body() { id, password }: ResetDTO): Promise<void> {
    const user = UserEntity.create({
      id,
      name: '',
      email: '',
      password,
      phone: '',
      barber: false,
      createdAt: new Date(),
    });

    await this.authResetService.execute(user);
    this.jwtApp.createAccessToken({
      userId: user.id.getValue(),
      name: user.name,
      email: user.email,
      barber: user.barber,
    });

    this.jwtApp.createRefreshToken({
      userId: user.id.getValue(),
      name: user.name,
      email: user.email,
      barber: user.barber,
    });
  }
}
