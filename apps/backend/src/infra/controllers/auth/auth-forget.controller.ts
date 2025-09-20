import { Body, Controller, Post } from '@nestjs/common';
import { AuthForgetService } from '@repo/auth';
import { EmailVO } from '@repo/core';

@Controller('/auth')
export class AuthForgetController {
  constructor(private readonly authForgetService: AuthForgetService) {}

  @Post('/forget')
  async handle(@Body() email: EmailVO): Promise<void> {
    await this.authForgetService.execute({ email });
  }
}
