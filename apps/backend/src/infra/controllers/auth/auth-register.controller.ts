import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthRegisterService } from 'src/infra/application/services/auth/auth-register.service';

export type User = {
  id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  barber: boolean;
};

@Controller('/auth')
export class AuthRegisterController {
  constructor(private readonly authRegisterService: AuthRegisterService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async handle(@Body() user: User): Promise<void> {
    console.log('AuthRegisterController=>');

    await this.authRegisterService.execute(user);
  }
}
