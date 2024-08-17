import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CoreModule } from './core/core.module'
import Configs from './shared/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ResponseInterceptor } from './shared/http/response.interceptor'

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
  providers: [
    ConfigService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
