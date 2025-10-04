import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { EnvZod } from './shared/schemas/envZod.schema';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false
  });

  const configService = app.get<ConfigService<EnvZod, true>>(ConfigService);
  const port = configService.get("APP_PORT", {infer: true})

  app.enableCors({
    origin: [process.env.FRONTEND_URL], // ✅ frontend URL exata
    credentials: true, // ✅ permite cookies/sessão/autenticação
  });

  await app.listen(port);
}
bootstrap();
