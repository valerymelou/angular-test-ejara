import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { WindowService } from 'src/app/core/window.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() navbarToggleClick = new EventEmitter();

  constructor(public auth: AuthService, public windowService: WindowService) { }

  toggleNavbar(): void {
    this.navbarToggleClick.emit();
  }

  logout(): void {
    this.auth.logout();
    this.windowService.reload();
  }
}
