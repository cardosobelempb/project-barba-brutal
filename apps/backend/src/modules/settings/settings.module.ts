import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EnvZod } from 'src/shared/schemas/envZod.schema';

import { ENV_SETTINGS, EnvSettingsService } from "./EnvSettings.service";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  })],
  providers: [{
    provide: ENV_SETTINGS,
    inject: [ConfigService],
    useFactory: (configService: ConfigService<EnvZod, true>) => {
      return new EnvSettingsService(configService)
    }
  }],
  exports: [ENV_SETTINGS]
})
export class SettingsModule { }
