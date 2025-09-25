import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ErrorConstants, UnauthorizedError } from '@repo/core';
import { UserEntity, UserPayloadDTO } from '@repo/types';
import { UserFindByIdService } from '@repo/user';
import { Request } from 'express';
import { JwtApp } from 'src/infra/jwt/JwtApp';

interface RequestWithUser extends Request {
  tokenPayload?: UserPayloadDTO; // ou o tipo retornado por JwtApp.verifyAccessToken
  user?: UserEntity;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userFindByIdService: UserFindByIdService,
    private readonly jwtApp: JwtApp<UserPayloadDTO>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const { authorization } = request.headers;

    if (!authorization?.startsWith('Bearer ')) return false;

    const token = authorization.split(' ')[1];

    try {
      const tokenData = this.jwtApp.verifyAccessToken(token);
      console.log('Token Data => ', tokenData);

      if (!tokenData) {
        throw new UnauthorizedError(ErrorConstants.INVALID_TOKEN);
      }

      const user = await this.userFindByIdService.execute(tokenData.userId);
      console.log('User => ', user);

      if (!user) {
        return false;
      }

      request.tokenPayload = tokenData;
      request.user = user;

      return true;
    } catch (error) {
      console.error('Erro no AuthGuard:', error);
      throw new UnauthorizedError(ErrorConstants.UNAUTHORIZED);
    }
  }
}
