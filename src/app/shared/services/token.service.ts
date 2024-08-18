import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { TokenDto } from '../../modules/auth/dto/token.dto'
import { JwtPayload } from '../../modules/auth/dto/jwt-payload.dto'
import { BLACKLIST_TOKENS_PREFIX } from '../constants.ts/constants'
import { timeToSeconds } from '../helpers/utils'
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager'

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: CacheStore,
  ) {}

  public generateAuthToken(payload: JwtPayload): TokenDto {
    const accessTokenExpires = this.configService.get(
      'auth.accessTokenExpiresIn',
    )
    const accessToken = this.generateToken(payload, accessTokenExpires)

    return { accessToken }
  }

  public verifyToken(token: string) {
    try {
      return this.jwtService.verify(token)
    } catch (err) {
      throw new UnauthorizedException('Access Denied')
    }
  }

  public async isBlacklisted(token: string, username: string) {
    const key = `${BLACKLIST_TOKENS_PREFIX}:${username}`
    const storedValue = await this.cacheManager.get(key)
    return storedValue === token
  }

  public async saveTokenOnBlacklist(
    token: string,
    username: string,
  ): Promise<void> {
    const key = `${BLACKLIST_TOKENS_PREFIX}:${username}`
    const accessTokenTtl = this.configService.get('auth.accessTokenExpiresIn')
    const ttl = timeToSeconds(accessTokenTtl)
    return await this.cacheManager.set(key, token, { ttl })
  }

  private generateToken(payload: JwtPayload, expiresIn: string): string {
    return this.jwtService.sign(payload, { expiresIn })
  }
}
