import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthRegisterService } from '@repo/auth';
import { AuthRegisterPresenter } from '@repo/types';

// import { JwtAdapter } from 'src/infra/adapters/JwtAdapter';

import type { AuthRegisterDTO, UserPayloadDTO } from '@repo/types';

@Controller('/auth')
export class AuthRegisterController {
  constructor(
    private readonly authRegisterService: AuthRegisterService,
<<<<<<< HEAD
    private readonly jwtAdapter: JwtAdapter<UserPayloadDTO>,
=======
    // private readonly jwtAdapter: JwtAdapter<{ userId: string; email: string }>,
>>>>>>> 76c59092360c13693d66e096b815d5bc4273c6a9
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async handle(
    @Body() entity: AuthRegisterDTO,
  ): Promise<AuthRegisterPresenter> {
    const user = await this.authRegisterService.execute(entity);

    return {
      user: AuthRegisterPresenter.toHTTP(user),
<<<<<<< HEAD
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
=======
      // accessToken: this.jwtAdapter.createAccessToken({
      //   userId: user.id.getValue(),
      //   email: user.email,
      // }),
      // refreshToken: this.jwtAdapter.createRefreshToken({
      //   userId: user.id.getValue(),
      //   email: user.email,
      // }),
>>>>>>> 76c59092360c13693d66e096b815d5bc4273c6a9
    };
  }
}
