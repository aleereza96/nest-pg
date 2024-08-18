import { Reflector } from '@nestjs/core'
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ExtractJwt } from 'passport-jwt'
import { TokenService } from '../services/token.service'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly tokenService: TokenService,
    private reflector: Reflector,
  ) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(
      context.switchToHttp().getRequest(),
    )
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }

    if (!accessToken) {
      throw new UnauthorizedException('Access Denied')
    }

    const payload = this.tokenService.verifyToken(accessToken)
    if (!payload) {
      throw new UnauthorizedException('Access Denied')
    }
    
    const username = payload.username
    const isBlacklisted = this.tokenService.isBlacklisted(accessToken, username)
    if (isBlacklisted) {
      throw new UnauthorizedException('Access Denied')
    }

    request.accessToken = accessToken
    return super.canActivate(context)
  }

  handleRequest(error, user) {
    if (error || !user) {
      throw new UnauthorizedException('Access Denied')
    }
    return user
  }
}
