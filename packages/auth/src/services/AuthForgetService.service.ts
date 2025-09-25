import { ServiceAbstract } from '@repo/core';
import { ForgetDTO } from '@repo/types';
import { UserRepository } from '@repo/user';

// import { MailerService } from '@repo/mailer'; // Futuro envio de email
// import { TokenService } from '@repo/token'; // Futuro gerador/salvador de token

/**
 * Serviço responsável por iniciar o processo de recuperação de senha.
 */
export class AuthForgetService implements ServiceAbstract<ForgetDTO, void> {
  constructor(
    private readonly userRepository: UserRepository,
    // private readonly mailer: MailerService,
    // private readonly tokenService: TokenService,
  ) {}

  /**
   * Executa a lógica de recuperação de senha:
   * 1. Verifica se o e-mail pertence a um usuário válido.
   * 2. Gera e salva o token de recuperação.
   * 3. Dispara o e-mail com instruções.
   */
  async execute({ email }: ForgetDTO): Promise<void> {
    // Verifica se o e-mail existe na base de usuários
    const user = await this.userRepository.findByEmail(email);

    // Segurança: não revela se o e-mail está cadastrado ou não
    if (!user) {
      // Opcional: inserir log, delay, métrica ou rastreamento
      return;
    }

    // Gerar token de recuperação (pseudocódigo - pode ser JWT, UUID, etc.)
    // const resetToken = await this.tokenService.generateForUser(user.id);

    // Persistir o token associado ao usuário (expiração, tipo, etc.)
    // await this.tokenService.save(resetToken);

    // Enviar o e-mail com o token para o usuário
    // await this.mailer.sendResetPasswordEmail(user.email, resetToken);

    // Finaliza o processo — nenhuma resposta é enviada ao usuário (por segurança)
  }
}
