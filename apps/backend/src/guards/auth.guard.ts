import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ErrorConstants, UnauthorizedError } from '@repo/core';
import { UserEntity, UserPayloadDTO } from '@repo/types';
import { UserFindByIdService } from '@repo/user';
import { Request } from 'express';
import { JwtAdapter } from 'src/infra/jwt/JwtAdapter';

/**
 * Extensão do tipo Request para incluir payload e usuário autenticado.
 */
interface RequestWithUser extends Request {
  tokenPayload?: UserPayloadDTO;
  user?: UserEntity;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userFindByIdService: UserFindByIdService,
    private readonly jwtAdapter: JwtAdapter<UserPayloadDTO>,
  ) {}

  /**
   * Método principal do Guard. Valida o token e anexa o usuário à requisição.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedError(ErrorConstants.INVALID_TOKEN);
    }

    const tokenPayload = this.jwtAdapter.verifyAccessToken(token);

    if (!tokenPayload) {
      throw new UnauthorizedError(ErrorConstants.INVALID_TOKEN);
    }

    const user = await this.userFindByIdService.execute(tokenPayload.userId);

    if (!user) {
      throw new UnauthorizedError(ErrorConstants.UNAUTHORIZED);
    }

    // Enriquecendo o request com os dados autenticados
    request.tokenPayload = tokenPayload;
    request.user = user;

    return true;
  }

  /**
   * Extrai e valida o token do header Authorization.
   */
  private extractToken(request: Request): string | null {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const [, token] = authHeader.split(' ');
    return token || null;
  }
}
