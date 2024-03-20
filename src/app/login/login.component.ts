import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
const headers = new HttpHeaders({
  'content-type': 'application/json',
});

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  data: any;
  responsedata: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      EmailId: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.auth.userLogin(this.loginForm.value).subscribe((res: any) => {
        console.log(res);
        if (res.responseCode === 'Login Success') {
          this.responsedata = res.responseMessage;
          sessionStorage.setItem('token', this.responsedata);
          sessionStorage.setItem(
            'accountNumber',
            res.accountInfo.accountNumber
          );
          console.log(this.responsedata);
          this.router.navigate(['/home']);
        } else {
          alert('Invalid Credentials');
        }
      });
    }
  }
}

// @Injectable({
//   providedIn: 'root',
// })
// export class Login {
//   public getToken() {
//     return localStorage.getItem('token');
//   }
//   EmailId: string;
//   Password: string;
//   constructor() {
//     this.EmailId = '';
//     this.Password = '';
//   }
// }
