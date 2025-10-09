import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import type { UserCreateDTO } from '@repo/types';
import { UserRegisterService } from '@repo/user';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
// import { AuthGuard } from 'src/guards/auth.guard';

// @UseGuards(AuthGuard, RoleGuard)
@Roles(Role.Admin)
@Controller('/users')
export class UserRegisterController {
  constructor(private readonly userRegisterService: UserRegisterService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async handle(@Body() entity: UserCreateDTO): Promise<void> {
    await this.userRegisterService.execute(entity);
  }
}
