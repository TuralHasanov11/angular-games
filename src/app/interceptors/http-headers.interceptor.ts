import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { environment as env } from 'src/environments/environment';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'x-rapidapi-key': env.RAPIDAPI_API_KEY,
        'x-rapidapi-host': env.RAPIDAPI_API_HOST
      },

      setParams: {
        key: env.RAPIDAPI_KEY
      }
    })

    return next.handle(req).pipe(
      catchError(err => {
        return throwError(() => new Error(err))
      })
    )
  }
}
