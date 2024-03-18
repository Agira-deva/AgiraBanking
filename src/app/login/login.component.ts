import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
const headers = new HttpHeaders({
  'content-type': 'application/json'

});

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    loginObj: Login;
loginForm: any;

    constructor(private http: HttpClient, private router: Router) {
      this.loginObj = new Login();
      console.log(this.loginObj);
    }

    onLogin() {
      console.log(this.loginObj);
      this.http
        .post('http://localhost:8080/api/user/login', this.loginObj, { headers })
        .subscribe({
          next: (res: any) => {
            console.log(res);
            if (res.responseCode === 'Login Success') {
              alert('Login Success');
              this.router.navigateByUrl('/home');
            } else {
              alert(res.responseCode);
              alert(res.responseMessage);
            }
          },
          error: (err: any) => {
            console.error('An error occurred:', err);
            alert(
              'An error occurred while trying to login. Please try again later.'
            );
          },
        });

    }
    onRegistration(){
      this.router.navigateByUrl('/signup')
    }

  }

  export class Login {
    EmailId: string;
    Password: string;
    constructor() {
      this.EmailId = '';
      this.Password = '';
    }
  }

