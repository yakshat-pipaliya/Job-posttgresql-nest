import { Injectable, NestInterceptor, ExecutionContext, CallHandler, } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class LoginInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        return next.handle().pipe(
            map((data) => {
                const { user, access_token } = data;

                return {
                    statusCode: 200,
                    message: 'Login successful',
                    path: request.url,
                    ...user,
                    access_token,
                    timestamp: new Date().toISOString(),
                };
            }),
        );
    }
}
