import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from '../core/storage.service';
import { AuthData } from './auth-data';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user?: User;
  private accessToken?: string;
  private refreshToken?: string;
  private authState: any = null;

  constructor(private http: HttpClient, private storage: StorageService) { }

  authenticate(login: string, password: string): Observable<AuthData> {
    const data = {
      log: login,
      password: password
    };
    return this.http.post('/auth/login', JSON.stringify(data)).pipe(
      map((response: any) => {
        const authData: AuthData = {
          token: response.token,
          refresh: response.refresh_token,
          expires_in: response.expires_in,
          token_type: response.token_type
        };

        return authData;
      })
    );
  }

  isAuthenticated(): boolean {
    if (this.accessToken && this.refreshToken) {
      return true;
    }

    return false;
  }

  getAccessToken(): string {
    if (this.accessToken) {
      return this.accessToken;
    }

    return '';
  }

  login(authData: AuthData): boolean {
    if (this.initSession(authData.token, authData.refresh)) {
      this.storage.setItem(environment.tokenKey, authData.token);
      this.storage.setItem(environment.refreshTokenKey, authData.refresh);

      return true;
    }

    return false;
  }

  logout(): void {
    this.user = undefined;
    this.accessToken = undefined;
    this.refreshToken = undefined;
    this.storage.clear();
  }

  initSession(accessToken?: string, refreshToken?: string): boolean {
    // Load the tokens from the storage if not provided.
    const access = accessToken || this.storage.getItem(environment.tokenKey);
    const refresh = refreshToken || this.storage.getItem(environment.refreshTokenKey);

    // We need both tokens to be available
    if (!access || !refresh) {
      return false;
    }

    // Decipher the access token to find user information.
    let state: any = {};

    try {
      state = jwtDecode(access);
    } catch (Error) {
      return false;
    }

    // If the deciphering works, set the accessToken and refreshToken props
    this.authState = state;
    this.accessToken = access;
    this.refreshToken = refresh;

    return true;
  }

  isFullyAuthenticated(): boolean {
    if (!this.isAuthenticated() || !this.authState) {
      return false;
    }

    const tokenExpiresAt = new Date(this.authState.exp * 1000);
    const now = new Date();

    if (tokenExpiresAt < now) {
      return false;
    }

    return true;
  }
}
