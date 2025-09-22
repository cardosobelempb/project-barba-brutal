import { Body, Controller, Post } from '@nestjs/common';
import { AuthResetService } from '@repo/auth';

import type { AuthResetProps } from '@repo/types';

@Controller('/auth')
export class AuthResetController {
  constructor(private readonly authResetService: AuthResetService) {}

  @Post('/reset')
  async handle(@Body() { entity }: AuthResetProps): Promise<void> {
    await this.authResetService.execute({ entity });
  }
}
