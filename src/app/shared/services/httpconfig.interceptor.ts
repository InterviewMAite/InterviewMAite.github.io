import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaderResponse,
    HttpInterceptor,
    HttpRequest,
    HttpSentEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConstantService } from './constant.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(
        public constantService: ConstantService,
        public router: Router,
        private toastr: ToastrService
    ) {}

    intercept(
        request: HttpRequest<string>,
        next: HttpHandler
    ): Observable<HttpEvent<HttpSentEvent | HttpHeaderResponse>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 500) {
                    this.toastr.error(
                        'Something went wrong. Please try again',
                        'Error!'
                    );
                }

                if (error.status === 403) {
                    window.open(this.constantService.CORS_URL, '_blank');
                }

                return throwError(() => error);
            })
        );
    }
}
