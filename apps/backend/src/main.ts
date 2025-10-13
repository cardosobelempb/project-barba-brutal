import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
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

  app.setGlobalPrefix(PREFIX_URL)
  await app.listen(PORT);
}
bootstrap();
