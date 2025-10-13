import { Controller, Post } from '@nestjs/common';
import { UserCreatePresenter } from '@repo/types';
import { User } from 'src/modules/user/decorators/user.decorator';

// import { AuthGuard } from 'src/guards/auth.guard';

// import { JwtAdapter } from 'src/infra/adapters/JwtAdapter';

@Controller('/auth')
export class AuthMeController {
  // constructor(private readonly jwtAdapter: JwtAdapter<UserPayloadDTO>) {}

  // @UseGuards(AuthGuard)
  @Post('/me')
  handle(@User() user: UserCreatePresenter) {
    return { user: UserCreatePresenter.toHTTP(user) };
  }
}
