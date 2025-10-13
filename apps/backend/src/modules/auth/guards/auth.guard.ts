import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ErrorConstants, UnauthorizedError } from '@repo/core';
import { TokenDTO, UserEntity } from '@repo/types';
import { UserFindByIdService } from '@repo/user';
import { Request } from 'express';
import { JwtAdapter } from 'src/modules/auth/adapters/JwtAdapter';

// import { JwtAdapter } from 'src/infra/adapters/JwtAdapter';

/**
 * Extensão do tipo Request para incluir payload e usuário autenticado.
 */
interface RequestWithUser extends Request {
  tokenPayload?: TokenDTO;
  user?: UserEntity;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userFindByIdService: UserFindByIdService,
    private readonly jwtAdapter: JwtAdapter<TokenDTO>,
  ) {}

  /**
   * Método principal do Guard. Valida o token e anexa o usuário à requisição.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const accessToken = this.extractToken(request);

    if (!accessToken) {
      throw new UnauthorizedError(ErrorConstants.INVALID_TOKEN);
    }

    const tokenPayload = this.jwtAdapter.verifyAccessToken(accessToken);

    if (!tokenPayload) {
      throw new UnauthorizedError(ErrorConstants.INVALID_TOKEN);
    }

    const user = await this.userFindByIdService.execute(tokenPayload.user.userId);

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
