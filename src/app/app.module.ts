import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CoreModule } from './core/core.module'
import Configs from './shared/config'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { ResponseInterceptor } from './shared/http/response.interceptor'
import { HttpExceptionFilter } from './shared/http/http-exception.filter'

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
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
