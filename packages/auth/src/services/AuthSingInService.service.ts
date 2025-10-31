import { ErrorConstants, HashComparer, ServiceAbstract, UnauthorizedError } from '@repo/core'
import { SignInDTO, UserEntity } from '@repo/types'
import { UserRepository } from '@repo/user'

/**
 * 🔐 Serviço responsável por autenticar usuários.
 *
 * Fluxo:
 * 1. Buscar usuário pelo e-mail.
 * 2. Validar existência.
 * 3. Comparar senha informada com hash armazenado.
 * 4. Retornar entidade do usuário autenticado.
 *
 * @throws UnauthorizedError se credenciais forem inválidas.
 */
export class AuthSignInService
  implements ServiceAbstract<SignInDTO, UserEntity>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashComparer: HashComparer,
  ) {}

  /**
   * Executa o processo de autenticação.
   * @param credentials Credenciais do usuário (e-mail e senha)
   * @returns Entidade do usuário autenticado
   */
  async execute({ email, password }: SignInDTO): Promise<UserEntity> {
    // 1️⃣ Buscar usuário pelo e-mail
    const user = await this.userRepository.findByEmail(email)

    // ✅ Fail Fast — evita processamento desnecessário
    if (!user) {
      throw new UnauthorizedError(ErrorConstants.INVALID_CREDENTIALS)
    }

    // 2️⃣ Verificar se a senha corresponde ao hash armazenado
    const isPasswordValid = await this.hashComparer.compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedError(ErrorConstants.INVALID_CREDENTIALS)
    }

    // 3️⃣ Retornar o usuário autenticado
    return user
  }
}

// ✅ Export nomeado para padronização e injeção de dependência
export const AUTH_SIGN_IN_SERVICE = AuthSignInService
