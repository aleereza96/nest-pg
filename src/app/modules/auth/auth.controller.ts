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
import { ApiTags } from '@nestjs/swagger'
import { Public } from 'src/app/shared/decorators/public.decorator'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @UsePipes(new ValidationPipe())
  @UseGuards(LocalAuthGuard)
  public async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @Post('register')
  @Public()
  @UsePipes(new ValidationPipe())
  public async register(@Body() data: RegisterDto) {
    return this.authService.register(data)
  }

  @Post('logout')
  public async logout(@Request() req) {
    await this.authService.logout(req.user, req.token)
    return true
  }
}
