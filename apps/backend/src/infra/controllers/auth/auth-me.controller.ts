import { Controller, Post, UseGuards } from '@nestjs/common';
import { UserCreatePresenter, UserPayloadDTO } from '@repo/types';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { JwtApp } from 'src/infra/jwt/JwtApp';

@Controller('/auth')
export class AuthMeController {
  constructor(private readonly jwtApp: JwtApp<UserPayloadDTO>) {}

  @UseGuards(AuthGuard)
  @Post('/me')
  handle(@User() user: UserCreatePresenter) {
    return { user: UserCreatePresenter.toHTTP(user) };
  }
}
