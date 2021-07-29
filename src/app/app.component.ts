import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-test-ejara';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.initSession();
  }
}
