import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Request,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { RegisterDto } from './dto/register.dto'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Public } from 'src/app/shared/decorators/public.decorator'
import { LoginDto } from './dto/login.dto'
import { AuthResponseDto } from './dto/auth-response.dto'
import { ApiGlobalResponse } from 'src/app/shared/decorators/api-global-response.decorators'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Log in an existing user' })
  @ApiBody({ type: LoginDto })
  @ApiGlobalResponse(AuthResponseDto)
  @Public()
  @UsePipes(new ValidationPipe())
  @UseGuards(LocalAuthGuard)
  public async login(@Request() req): Promise<AuthResponseDto> {
    return this.authService.login(req.user)
  }

  @Post('register')
  @ApiOperation({ summary: 'Signing up new user' })
  @ApiBody({ type: RegisterDto })
  @ApiGlobalResponse(AuthResponseDto)
  @Public()
  @UsePipes(new ValidationPipe())
  public async register(@Body() data: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(data)
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logging out user' })
  public async logout(@Request() req): Promise<boolean> {
    await this.authService.logout(req.user, req.token)
    return true
  }
}
