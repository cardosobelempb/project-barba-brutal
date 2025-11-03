import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { Role, type UserCreateDTO } from '@repo/types';
import { UserRegisterService } from '@repo/user';
import { Roles } from 'src/decorators/roles.decorator';

// import { AuthGuard } from 'src/guards/auth.guard';

// @UseGuards(AuthGuard, RoleGuard)
@Roles(Role.ADMIN)
@Controller('/users')
export class UserRegisterController {
  constructor(private readonly userRegisterService: UserRegisterService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async handle(@Body() entity: UserCreateDTO): Promise<void> {
    await this.userRegisterService.execute(entity);
  }
}
