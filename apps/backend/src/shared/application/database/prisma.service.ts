import { Global, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * ✅ PrismaService
 *
 * Serviço responsável por encapsular o PrismaClient e integrá-lo ao ciclo de vida do NestJS.
 * - Garante conexão/desconexão automáticas.
 * - Centraliza configurações de log.
 * - Facilita extensão com middlewares (ex: auditoria, métricas, interceptação de queries).
 * - Pode ser facilmente mockado em testes.
 */
@Global() // Disponibiliza o serviço globalmente sem precisar importar em cada módulo
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // Logger do Nest para observabilidade e debugging
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: ['warn', 'error'], // Evita poluição de logs (use 'query' em ambiente de desenvolvimento se necessário)
    });
  }

  /**
   * 🔌 Inicializa a conexão com o banco de dados assim que o módulo é carregado.
   */
  async onModuleInit(): Promise<void> {
    try {
      await this.$connect();
      this.logger.log('✅ Conectado ao banco de dados com sucesso.');
    } catch (error) {
      this.logger.error('❌ Falha ao conectar ao banco de dados:', error);
      throw error;
    }
  }

  /**
   * 🧹 Desconecta do banco de dados quando o módulo é encerrado.
   * Boa prática para liberação de recursos e encerramento limpo.
   */
  async onModuleDestroy(): Promise<void> {
    try {
      await this.$disconnect();
      this.logger.log('🛑 Conexão com o banco de dados encerrada.');
    } catch (error) {
      this.logger.error('⚠️ Erro ao encerrar conexão com o banco:', error);
    }
  }

  /**
   * 🔁 Método opcional para uso em scripts independentes (fora do contexto NestJS)
   * Permite reuso do serviço em CLI ou testes sem depender do ciclo de vida completo.
   */

}
