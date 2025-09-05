import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthRegisterService } from 'src/application/services/auth/auth-register.service';

export type UserEntity = {
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
  async handle(@Body() entity: UserEntity): Promise<void> {
    console.log('AuthRegisterController=>');

    await this.authRegisterService.execute(entity);
  }
}
