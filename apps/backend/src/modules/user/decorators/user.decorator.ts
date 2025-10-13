import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ErrorConstants, NotFoundError } from '@repo/core';
import { UserEntity } from '@repo/types';
import { Request } from 'express';

interface UserRequest extends Request {
  user?: UserEntity;
}

export const User = createParamDecorator(
  (data: keyof UserEntity | undefined, context: ExecutionContext): any => {
    const request = context.switchToHttp().getRequest<UserRequest>();
    const user = request.user;

    if (user) {
      return data ? user?.[data] : user;
    } else {
      throw new NotFoundError(
        `${ErrorConstants.ENTITY_NOT_FOUND} use o AuthGuard para obter o usuário.`,
      );
    }
  },
);

/**
 @Get()
getProfile(@User() user: UserEntity) {}

@Get('email')
getEmail(@User('email') email: string) {}

 */
