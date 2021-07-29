import { Component } from '@angular/core';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent {
  sidebarClosed = false;

  constructor() { }

  onNavbarToggle(): void {
    this.sidebarClosed = !this.sidebarClosed;
  }

}
