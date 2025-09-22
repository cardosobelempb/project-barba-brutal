import { Body, Controller, Post } from '@nestjs/common';
import { AuthResetService } from '@repo/auth';

import type { ResetDTO } from '@repo/types';
import { UserEntity } from '@repo/types';

@Controller('/auth')
export class AuthResetController {
  constructor(private readonly authResetService: AuthResetService) {}

  @Post('/reset')
  async handle(@Body() { id, password }: ResetDTO): Promise<void> {
    const entity = UserEntity.create({
      id,
      name: '',
      email: '',
      password,
      phone: '',
      barber: false,
      createdAt: new Date(),
    });

    await this.authResetService.execute(entity);
  }
}
