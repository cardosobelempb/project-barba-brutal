import { Body, Controller, Post } from '@nestjs/common';

import type { SignInDTO, UserEntity } from '@repo/types';

@Controller('auth')
export class AuthController {
  @Post('login')
  async login(@Body() body: SignInDTO) {}

  @Post('register')
  async register(@Body() body: UserEntity) {}

  @Post('forget')
  async forget(@Body() body: { email: string }) {}

  @Post('resert')
  async reset(@Body() body: { password: string; token: string }) {}
}
