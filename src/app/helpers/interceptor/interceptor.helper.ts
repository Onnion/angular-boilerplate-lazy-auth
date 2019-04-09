import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap, retry} from 'rxjs/operators';
import {AuthService} from '../../services/auth/auth.service';
import {HandlerErrorHelpers} from '../handler-error/handler-error.helper';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
    protected handlerErrorHelper;


    constructor(public auth: AuthService, private handler: HandlerErrorHelpers) {
        this.handlerErrorHelper = handler;
    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.auth.getToken()}`
            }
        });

        // retry(1)
        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (event.body.error) {
                        this.handlerErrorHelper.handle(event);
                    }
                }
            },
            (error: any) => {
                if (error instanceof HttpErrorResponse) {
                    this.handlerErrorHelper.handle(error);

                }
            })
        );
    }
}
