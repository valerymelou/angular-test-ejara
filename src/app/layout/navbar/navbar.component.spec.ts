import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AuthService } from 'src/app/auth/auth.service';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authMock = jasmine.createSpyObj('AuthService', ['logout']);

    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers: [
        {
          provide: AuthService,
          useValue: authMock
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit navbarToggleClick', () => {
    spyOn(component.navbarToggleClick, 'emit');
    const navbarTogglerButton = fixture.debugElement.query(By.css('.navbar-toggler'));
    navbarTogglerButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(component.navbarToggleClick.emit).toHaveBeenCalled();
  });

  it('should logout', () => {
    spyOn(component.windowService, 'reload');
    component.logout();

    expect(authSpy.logout).toHaveBeenCalled();
  });
});
