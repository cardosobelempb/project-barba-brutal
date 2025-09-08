import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import type { UserProps } from '@repo/types';
import { AuthRegisterService } from 'src/application/services/auth/auth-register.service';

@Controller('/auth')
export class AuthRegisterController {
  constructor(private readonly authRegisterService: AuthRegisterService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async handle(@Body() entity: UserProps): Promise<void> {
    console.log('AuthRegisterController=>');

    await this.authRegisterService.execute(entity);
  }
}
