import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthData } from '../auth-data';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form = new FormGroup({
    log: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  error: any = null;
  loading = false;

  constructor(private router: Router, private auth: AuthService) { }

  onSubmit() {
    if (this.form.valid) {
      const login = this.form.value.log;
      const password = this.form.value.password;
      this.loading = true;

      this.auth.authenticate(login, password)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((authData: AuthData) => {
        this.auth.login(authData);
        this.router.navigate(['/dashboard']);
      }, error => {
        this.error = error.error.message;
      });
    }
  }
}
