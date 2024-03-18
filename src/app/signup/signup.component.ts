import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Signup {
  EmailId: string;
  Password: string;
  firstName: string;
  lastName: string;
  otherName: string;
  gender: string;
  address: string;
  stateOfOrigin: string;
  phoneNumber: string;
  alternativePhoneNumber: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signUpObj: Signup = {
    EmailId: '',
    Password: '',
    firstName: '',
    lastName: '',
    otherName: '',
    gender: '',
    address: '',
    stateOfOrigin: '',
    phoneNumber: '',
    alternativePhoneNumber: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSignup(): void {
    this.http.post<any>('http://localhost:8080/api/user/', this.signUpObj)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.responseCode === 'Account has been successfully created') {
            alert('Account created successfully');
            this.router.navigateByUrl('/login');
          } else {
            alert(res.responseCode);
            alert(res.responseMessage);
          }
        },
        error: (err: any) => {
          console.error('An error occurred:', err);
          alert('An error occurred. Please try again later.');
        }
      });
  }
}
