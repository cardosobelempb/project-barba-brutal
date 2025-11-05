import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from "@nestjs/common";
import { AuthSignInService } from "@repo/auth";
import { ErrorConstants, UnauthorizedError } from "@repo/core";

import type { SignInDTO, TokenDTO } from "@repo/types";
import { AuthSignInPresenter } from "@repo/types";
import { JwtAdapter } from "src/adapters/JwtAdapter";
import { zodValidationPipe } from "src/pipes/libs/zod/zod-validation.pipe";
import { signInZodSchema } from "src/shared/schemas/signInZod.schema";

/**
 * 🎯 Controller responsável pela autenticação de usuários.
 *
 * Responsabilidades:
 * - Receber credenciais de login.
 * - Delegar autenticação ao caso de uso (AuthSignInService).
 * - Gerar tokens JWT (access e refresh).
 * - Retornar uma resposta padronizada (Presenter).
 *
 * ❗ Não deve conter lógica de negócio.
 */
@Controller("/auth")
export class AuthSignInController {
  constructor(
    private readonly authSignInService: AuthSignInService,
    private readonly jwtAdapter: JwtAdapter<TokenDTO>,
  ) {}

  /**
   * Endpoint de autenticação de usuário.
   * @param request Credenciais (e-mail e senha)
   * @returns Dados do usuário autenticado + tokens
   */
  @Post("/signin")
  @UsePipes(zodValidationPipe(signInZodSchema))
  @HttpCode(HttpStatus.OK) // ✅ Evita resposta 201 desnecessária
  async handle(@Body() request: SignInDTO): Promise<AuthSignInPresenter> {
    const { email, password } = request;

    try {
      // 1️⃣ Autentica o usuário (caso de uso)
      const user = await this.authSignInService.execute({ email, password });

      // 2️⃣ Monta o payload do JWT (somente dados seguros)
      const payload: TokenDTO = {
          name: user.name,
          email: user.email,
          userId: user.id.getValue(),
          barber: user.barber,
          role: user.role,
      };

      // 3️⃣ Gera os tokens JWT
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtAdapter.createAsyncAccessToken(payload),
        this.jwtAdapter.createAsyncRefreshToken(payload),
      ]);

      // 4️⃣ Retorna resposta formatada
      return {
        user: AuthSignInPresenter.toHTTP(user),
        accessToken,
        refreshToken,
      };
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        // 🔒 Customiza resposta de credenciais inválidas
        throw new UnauthorizedError(ErrorConstants.INVALID_CREDENTIALS);
      }

      // Repassa o erro para o filtro global
      throw error;
    }
  }
}
