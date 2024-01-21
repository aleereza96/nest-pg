import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CoreModule } from './core/core.module'
import Configs from './shared/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: Configs,
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    CoreModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
