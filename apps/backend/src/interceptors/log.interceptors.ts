import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LogInterceptor.name);

  intercept<T>(context: ExecutionContext, next: CallHandler<T>): Observable<T> {
    const start = Date.now();
    const request = context.switchToHttp().getRequest<Request>();

    return next.handle().pipe(
      tap(() => {
        const elapsedTime = Date.now() - start;
        this.logger.log(
          `[${request.method}] ${request.url} - ${elapsedTime}ms`,
        );
      }),
    ) as Observable<T>; // <--- força o tipo, com cautela
  }
}
