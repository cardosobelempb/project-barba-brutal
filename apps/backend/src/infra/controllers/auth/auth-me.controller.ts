import { Controller, Post, UseGuards } from '@nestjs/common';
import { UserCreatePresenter, UserPayloadDTO } from '@repo/types';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { JwtAdapter } from 'src/infra/jwt/JwtAdapter';

@Controller('/auth')
export class AuthMeController {
  constructor(private readonly jwtAdapter: JwtAdapter<UserPayloadDTO>) {}

  @UseGuards(AuthGuard)
  @Post('/me')
  handle(@User() user: UserCreatePresenter) {
    return { user: UserCreatePresenter.toHTTP(user) };
  }
}
