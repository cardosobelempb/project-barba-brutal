import { CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { ErrorConstants, UnauthorizedError } from '@repo/core';
import { TokenDTO, UserEntity } from '@repo/types';
import { UserFindByIdService } from '@repo/user';
import { Request } from 'express';
import { JwtAdapter } from 'src/adapters/JwtAdapter';

/**
 * Extensão do tipo Request para incluir informações autenticadas.
 */
export interface RequestWithUser extends Request {
  user?: UserEntity;
  tokenPayload?: TokenDTO;
}

export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly userFindByIdService: UserFindByIdService,
    private readonly jwtAdapter: JwtAdapter<TokenDTO>,
  ) {
  }


  /**
   * Valida o token JWT, carrega o usuário e anexa ao objeto Request.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const token = this.extractToken(request);
    if (!token) {
      this.logger.warn('Token ausente ou mal formatado no header Authorization.');
      throw new UnauthorizedError(ErrorConstants.INVALID_TOKEN);
    }

    const payload = this.validateToken(token);
    const user = await this.loadUser(payload);
    // Dentro do AuthGuard
    this.logger.debug('AuthGuard executado — user autenticado', user);

    // Enriquecer o request com dados autenticados
    request.tokenPayload = payload;
    request.user = user;

    this.logger.debug(`Usuário autenticado: ${user.id} - ${user.email}`);
    return true;
  }

  /**
   * Extrai o token JWT do cabeçalho Authorization.
   */
  private extractToken(request: Request): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return null;

    const [, token] = authHeader.split(' ');
    return token || null;
  }

  /**
   * Valida o token e retorna o payload decodificado.
   * Lança exceção padronizada em caso de falha.
   */
  private validateToken(token: string): TokenDTO {
    try {
      const payload = this.jwtAdapter.verifyAccessToken(token);
      if (!payload) {
        throw new UnauthorizedError(ErrorConstants.INVALID_TOKEN);
      }
      return payload;
    } catch (error) {
      this.logger.error('Falha ao validar token JWT', error.stack);
      throw new UnauthorizedError(ErrorConstants.INVALID_TOKEN);
    }
  }

  /**
   * Recupera o usuário do banco com base no payload.
   */
  private async loadUser(payload: TokenDTO): Promise<UserEntity> {
    const userId = payload?.userId;
    if (!userId) {
      this.logger.warn('Payload inválido: campo userId ausente.');
      throw new UnauthorizedError(ErrorConstants.INVALID_TOKEN);
    }

    const user = await this.userFindByIdService.execute(userId);
    if (!user) {
      this.logger.warn(`Usuário não encontrado: ${userId}`);
      throw new UnauthorizedError(ErrorConstants.UNAUTHORIZED);
    }

    return user;
  }
}
