import { Controller, Post } from '@nestjs/common';

@Controller('/auth')
export class AuthSignInController {
  @Post('signin')
  async handle() {}
}
