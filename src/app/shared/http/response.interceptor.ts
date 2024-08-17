import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { ResponseDto } from '../dtos/response.dto'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDto<T>> {
    const timestamp = new Date().getTime()
    return next.handle().pipe(
      map((payload) => {
        return { payload, timestamp }
      }),
    )
  }
}
