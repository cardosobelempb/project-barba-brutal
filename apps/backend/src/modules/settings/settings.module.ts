import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { EnvSettingsService } from "./EnvSettings.service";

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true})],
  providers: [EnvSettingsService],
  exports: [EnvSettingsService]
})
export class SettingsModule { }
