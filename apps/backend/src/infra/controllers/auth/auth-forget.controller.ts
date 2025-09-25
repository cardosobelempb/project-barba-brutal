import { Body, Controller, Post } from '@nestjs/common';
import { AuthForgetService } from '@repo/auth';

import type { ForgetDTO } from '@repo/types';

@Controller('/auth')
export class AuthForgetController {
  constructor(private readonly authForgetService: AuthForgetService) {}

  @Post('/forget')
  async handle(@Body() { email }: ForgetDTO): Promise<{ message: string }> {
    await this.authForgetService.execute({ email });
    return { message: 'Token enviado para o e-mail informado.' };
  }
}
