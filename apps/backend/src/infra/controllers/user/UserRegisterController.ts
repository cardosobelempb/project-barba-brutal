import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import type { UserProps } from '@repo/types';
import { UserRegisterService } from '@repo/user';

@Controller('/users')
export class UserRegisterController {
  constructor(private readonly userRegisterService: UserRegisterService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async handle(@Body() entity: UserProps): Promise<void> {
    await this.userRegisterService.execute(entity);
  }
}
