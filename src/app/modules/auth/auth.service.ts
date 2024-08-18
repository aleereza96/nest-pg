import { Inject, Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { TokenService } from '../../shared/services/token.service'
import { RegisterDto } from './dto/register.dto'
import { AuthMapper } from './auth.mapper'
import { JwtPayload } from './dto/jwt-payload.dto'
import { User } from '../user/user.entity'
import { AuthResponseDto } from './dto/auth-response.dto'
import { UserMapper } from '../user/user.mapper'
import { BLACKLIST_TOKENS_PREFIX } from '../../shared/constants.ts/constants'
import { timeToSeconds } from 'src/app/shared/helpers/utils'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  public async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUserByUsername(username)
    if (!user) {
      return null
    }
    const matchedPassword = this.userService.matchPassword(
      password,
      user.password,
    )
    if (matchedPassword) {
      const { password, ...result } = user
      return result
    }

    return null
  }

  public async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const createUserDto = AuthMapper.toCreateUserDto(registerDto)
    const user = await this.userService.create(createUserDto)
    const payload: JwtPayload = {
      id: `${user.id}`,
      username: user.username,
    }

    const token = this.tokenService.generateAuthToken(payload)
    const permissions = []

    return {
      user,
      permissions,
      token,
    }
  }

  public login(user: User): AuthResponseDto {
    const payload: JwtPayload = { id: `${user.id}`, username: user.username }
    const token = this.tokenService.generateAuthToken(payload)
    const permissions = user.roles.flatMap((role) =>
      role.permissions.map((permission) => permission.slug),
    )
    const authorizedUser = UserMapper.toDto(user)

    return {
      user: authorizedUser,
      permissions,
      token,
    }
  }

  public async logout(user: User, token: string) {
    return await this.tokenService.saveTokenOnBlacklist(token, user.username)
  }
}
