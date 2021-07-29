import { Component, EventEmitter, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PrivateComponent } from './private.component';


@Component({
  selector: 'app-navbar',
  template: ''
})
class NavbarMockComponent {
  @Output() navbarToggleClick = new EventEmitter();
}

@Component({
  selector: 'app-sidebar',
  template: ''
})
class SidebarMockComponent {}

describe('PrivateComponent', () => {
  let component: PrivateComponent;
  let fixture: ComponentFixture<PrivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateComponent, NavbarMockComponent, SidebarMockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidebar', () => {
    // First check initial position
    expect(component.sidebarClosed).toBeFalse();

    const appNavbar = fixture.debugElement.query(By.css('app-navbar'));
    appNavbar.triggerEventHandler('navbarToggleClick', {});
    fixture.detectChanges();

    expect(component.sidebarClosed).toBeTrue();
  });
});
