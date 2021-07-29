import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { BaseHeadersInterceptor } from './base-headers.interceptor';

describe('BaseHeadersInterceptor', () => {
  let client: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
          HttpClientTestingModule
        ],
        providers: [
          {
            provide: HTTP_INTERCEPTORS,
            useClass: BaseHeadersInterceptor,
            multi: true
          }
        ]
    });

    client = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should not modify headers of requests starting with http', () => {
    client.get('https://api.github.com/').subscribe();
    const request = httpMock.match({method: 'get'})[0].request;

    expect(request.headers.get('Content-Type')).toEqual(null);
    expect(request.headers.get('Accept')).toEqual(null);
  });

  it('should set the content type and accept headers', () => {
    client.get('/auth/login').subscribe();
    const request = httpMock.match({method: 'get'})[0].request;

    expect(request.headers.get('api-key')).toEqual(environment.apiKey);
    expect(request.headers.get('client-id')).toEqual(environment.clientId);
  });
});
