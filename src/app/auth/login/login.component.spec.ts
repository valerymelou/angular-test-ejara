import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthData } from '../auth-data';

import { AuthService } from '../auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', async () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authMock = jasmine.createSpyObj('AuthService', ['authenticate', 'login']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        SharedModule
      ],
      providers: [
        {
          provide: AuthService,
          useValue: authMock
        },
        {
          provide: Router,
          useValue: routerMock
        },
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', () => {
    const hostElement = fixture.nativeElement;
    const loginInput: HTMLInputElement = hostElement.querySelector('input[name="login"]');
    const passwordInput: HTMLInputElement = hostElement.querySelector('input[name="password"]');
    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    const authData: AuthData = {
      token: 'token',
      refresh: 'refresh',
      expires_in: 1238599384,
      token_type: 'Bearer'
    };
    authSpy.authenticate.and.returnValue(of(authData));
    authSpy.login.and.returnValue(true);
    routerSpy.navigate.and.returnValue(Promise.resolve(true));

    loginInput.value = 'test@ejara';
    passwordInput.value = 'password';

    loginInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    form.dispatchEvent(new Event('submit'));

    expect(authSpy.authenticate).toHaveBeenCalledWith(component.form.value.log, component.form.value.password);
    expect(authSpy.login).toHaveBeenCalledWith(authData);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
