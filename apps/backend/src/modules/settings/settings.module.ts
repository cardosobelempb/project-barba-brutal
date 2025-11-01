import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envZodSchema } from './env/env.zod';
import { ENVIRONMENT_CONFIG_SERVICE } from './env/environment-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => {
        const parsed = envZodSchema.safeParse(env);
        if (!parsed.success) {
          console.error('❌ Erro ao validar variáveis de ambiente:', parsed.error.format());
          throw new Error('Configuração de ambiente inválida');
        }
        return parsed.data;
      },
    }),
  ],
  providers: [ENVIRONMENT_CONFIG_SERVICE],
  exports: [ENVIRONMENT_CONFIG_SERVICE],
})
export class SettingsModule {}
