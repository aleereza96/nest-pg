import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CoreModule } from './core/core.module'
import Configs from './shared/config'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { ResponseInterceptor } from './shared/http/response.interceptor'
import { HttpExceptionFilter } from './shared/http/http-exception.filter'
import { UserModule } from './modules/user/user.module'
import { ProfileModule } from './modules/profile/profile.module'
import { PermissionModule } from './modules/permissions/permission.module'
import { RoleModule } from './modules/roles/role.module'
import { JwtAuthGuard } from './shared/guards/jwt-auth.guard'
import { AuthModule } from './modules/auth/auth.module'

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
    UserModule,
    ProfileModule,
    PermissionModule,
    RoleModule,
    AuthModule,
  ],
  providers: [
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
