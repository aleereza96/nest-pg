import { Request, Response } from 'express'
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  env: string

  constructor(private configService: ConfigService) {
    this.env = this.configService.get<string>('app.env')
  }
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    let message
    if (status === 500) {
      message = 'Internal server error'
    } else {
      message = exception.message || 'An error occurred'
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().getTime(),
      ...(this.env === 'development' && { type: exception.name }),
    })
  }
}
