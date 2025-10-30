import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { ErrorFilter } from './filters/error.filter';
import { EnvZod } from './shared/schemas/envZod.schema';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false
  });

  const configService = app.get<ConfigService<EnvZod, true>>(ConfigService);
  const PORT = configService.get("PORT", { infer: true })
  const FRONTEND_URL = configService.get("FRONTEND_URL", { infer: true })
  const PREFIX_URL = configService.get('PREFIX_URL')

  app.enableCors({
    origin: [FRONTEND_URL], // ✅ frontend URL exata
    credentials: true, // ✅ permite cookies/sessão/autenticação
  });

  // 🔹 Registra o filtro globalmente
  app.useGlobalFilters(new ErrorFilter());

  // 🔹 Logger padrão
  const logger = new Logger('Bootstrap');
  app.setGlobalPrefix(PREFIX_URL)
  await app.listen(PORT);
   logger.log(`🚀 Backend rodando em: http://localhost:${PORT}/${PREFIX_URL}`);
}
bootstrap();
