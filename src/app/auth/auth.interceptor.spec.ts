import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';

describe('AuthInterceptor', () => {
  let client: HttpClient;
  let httpMock: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['isFullyAuthenticated', 'getAccessToken']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    });

    client = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should add authorization header to request', () => {
    authServiceSpy.isFullyAuthenticated.and.returnValue(true);
    authServiceSpy.getAccessToken.and.returnValue('Token');
    client.get('/resource/').subscribe();
    const request = httpMock.match({method: 'get'})[0].request;

    expect(request.headers.get('token')).toEqual('Bearer Token');
  });

  it('should not add authorization header to request', () => {
    authServiceSpy.isFullyAuthenticated.and.returnValue(false);
    client.get('/resource/').subscribe();
    const request = httpMock.match({method: 'get'})[0].request;

    expect(request.headers.get('token')).toBeNull();
  });

  it('should not add authorization header to external request', () => {
    authServiceSpy.isFullyAuthenticated.and.returnValue(false);
    client.get('http://test.io/resource/').subscribe();
    const request = httpMock.match({method: 'get'})[0].request;

    expect(request.headers.get('token')).toBeNull();
  });
});
