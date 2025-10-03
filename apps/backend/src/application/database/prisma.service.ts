import { Global, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

/**
 * Serviço responsável por encapsular o PrismaClient
 * e integrá-lo ao ciclo de vida do NestJS (inicialização e destruição de módulo).
 */
@Global() // Torna o serviço acessível globalmente sem necessidade de importação em outros módulos
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // Configuração dos níveis de log do Prisma
    super({
      log: ['warn', 'error'], // Evita logs verbosos em produção
    });
  }

  /**
   * Conecta ao banco de dados assim que o módulo é iniciado.
   * O NestJS chama esse método automaticamente.
   */
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  /**
   * Desconecta do banco de dados quando o módulo é encerrado.
   * Ideal para garantir liberação de recursos em encerramentos controlados.
   */
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
