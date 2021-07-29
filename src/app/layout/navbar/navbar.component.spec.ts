import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
});
