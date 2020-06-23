import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SessionQuery} from "../../../authentication/store/session.query";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private sessionQuery: SessionQuery) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (!this.sessionQuery.getIsLoggedIn()) {
      return next.handle(request);
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.sessionQuery.getToken()}`
      }
    });

    return next.handle(request);
  }
}
