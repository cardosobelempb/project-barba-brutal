import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthRegisterService } from '@repo/auth';

import type { UserEntity } from '@repo/types';

@Controller('/auth')
export class AuthRegisterController {
  constructor(private readonly authRegisterService: AuthRegisterService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async handle(@Body() entity: UserEntity): Promise<void> {
    await this.authRegisterService.execute(entity);
  }
}
