import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
@Injectable({ providedIn: 'root' })
export class SignupComponent {
  reactiveForms: FormGroup;
  isSubmitting = false; // Flag to track form submission status

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.reactiveForms = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      otherName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      address: [''],
      stateOfOrigin: [''],
      phoneNumber: ['', Validators.required],
      alternativePhoneNumber: [''],
    });
  }

  onSubmit(): void {
    if (this.isSubmitting) {
      return; // Prevent multiple form submissions
    }

    this.isSubmitting = true;
    this.reactiveForms.markAllAsTouched();
    this.http
      .post<any>('http://localhost:8080/api/user/', this.reactiveForms.value)
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
        },
        complete: () => {
          this.isSubmitting = false; // Reset submission flag after request completes
        }
      });
  }
}
