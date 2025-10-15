import { ConfigService } from '@nestjs/config';
import { EnvZod } from 'src/shared/schemas/envZod.schema';

export class EnvSettingsService {
  constructor(private readonly configService: ConfigService<EnvZod, true>) {}

  get jwtPublicKey(): string {
    return this.configService.get<string>('JWT_PUBLIC_KEY', { infer: true });
  }

  get jwtPrivateKey(): string {
    return this.configService.get<string>('JWT_PRIVATE_KEY', { infer: true });
  }

  // get allowedRoles(): Role[] {
  //   return this.configService.get<Role[]>('ALLOWED_ROLES', { infer: true });
  // }

  // ... outros getters com validação e fallback, se necessário
}

export const ENV_SETTINGS = EnvSettingsService;
