import { ServiceAbstract } from '@repo/core';
import { ForgetDTO } from '@repo/types';
import { UserRepository } from '@repo/user';

// import { MailerService } from '@repo/mailer'; // hipotético

export class AuthForgetService implements ServiceAbstract<ForgetDTO, void> {
  constructor(
    private readonly userRepository: UserRepository,
    // private readonly mailer: MailerService, // caso use
  ) {}

  async execute({ email }: ForgetDTO): Promise<void> {
    // 1. Verifica se o email é válido via VO (presumimos que já é VO aqui)
    const user = await this.userRepository.findByEmail(email);

    // 2. Não revela se o email existe (opcional por segurança)
    if (!user) {
      // Opcional: logar internamente ou criar delay para evitar timing attack
      return;
    }

    // 3. Gerar token de recuperação (pseudocódigo)
    // const resetToken = TokenGenerator.generate({ userId: user.id });
    // await this.tokenRepository.save(resetToken);

    // 4. Enviar email (pseudocódigo)
    // await this.mailer.sendResetPasswordEmail(user.email, resetToken);

    // 5. Pronto — serviço finalizado
  }
}
