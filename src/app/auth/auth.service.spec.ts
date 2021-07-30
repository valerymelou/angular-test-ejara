import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StorageService } from '../core/storage.service';
import { AuthData } from './auth-data';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let storage: StorageService;
  const sampleToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [ StorageService ]
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    storage = TestBed.inject(StorageService);

    storage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate', () => {
    const response = {
      token: 'access_token',
      refresh_token: 'refresh_token'
    };

    service.authenticate('username', 'email').subscribe((authData: AuthData) => {
      expect(authData.token).toEqual('access_token');
      expect(authData.refresh).toEqual('refresh_token');
    });

    const req = httpTestingController.expectOne('/auth/login');
    expect(req.request.method).toEqual('POST');

    req.flush(response);
    httpTestingController.verify();
  });

  it('should log in with a valid auth data', () => {
    const authData: AuthData = {
      token: sampleToken,
      refresh: 'refresh_token',
      expires_in: 1943115195,
      token_type: 'Bearer'
    };
    const answer = service.login(authData);

    expect(service.isAuthenticated()).toBeTrue();
    expect(service.isFullyAuthenticated()).toBeTrue();
    expect(answer).toBeTrue();
  });

  it('should log out successfully', () => {
    const authData: AuthData = {
      token: sampleToken,
      refresh: 'refresh_token',
      expires_in: 1943115195,
      token_type: 'Bearer'
    };
    const answer = service.login(authData);
    service.logout();

    expect(service.isAuthenticated()).toBeFalse();
  });
});
