import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms/src/model';
import { CarBrand } from '../model/car-brand';
import { GeneralResponse } from '../model/GeneralResponse';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  response: GeneralResponse;
  loginRequest = new FormData();
  loading = false;
  error = null;
  public token: string;
  public status;

  constructor(private authService: AuthenticationService, private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onLogin() {
    this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value).subscribe(data => {

      if (data.token) {
        JSON.stringify({ username: this.loginForm.get('username').value, token: data.token });
        this.error = null;

        localStorage.setItem('myAccount', JSON.stringify(data.user));
        this.authService.myAccount = data.user;
        localStorage.setItem('geyushiUser', JSON.stringify({ username: this.loginForm.get('username').value, token: data.token }));
        this.router.navigate(['/']);

      } else {
        // return false to indicate failed login
        this.status = data.status;
        this.error = "email or password not correct !";

      }
    },
      error => {
        this.status = error.status;
        this.error = "email or password not correct !";
      });
  }

}
