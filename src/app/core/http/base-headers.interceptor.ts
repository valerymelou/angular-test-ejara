import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class BaseHeadersInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith(environment.apiRoot)) {
      let headers = request.headers.set('api-key', environment.apiKey);
      headers = headers.set('client-id', `${environment.clientId}`);

      const apiRequest = request.clone({headers});

      return next.handle(apiRequest);
    }

    return next.handle(request);
  }
}
