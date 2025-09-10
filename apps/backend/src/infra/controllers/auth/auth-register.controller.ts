import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthRegisterService } from '@repo/auth';

import type { UserProps } from '@repo/types';

@Controller('/auth')
export class AuthRegisterController {
  constructor(private readonly authRegisterService: AuthRegisterService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async handle(@Body() entity: UserProps): Promise<void> {
    await this.authRegisterService.execute(entity);
  }
}
