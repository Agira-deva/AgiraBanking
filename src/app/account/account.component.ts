import { AuthService } from './../service/auth.service';
import { Component } from '@angular/core';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  accountNumber!: string;
  balanceInfo: any;
  errorMessage!: string;

  constructor(private balanceService: AccountService,private authService:AuthService) {}

  onSubmit(): void {
    if(this.authService.isLoggedIn()){
      this.balanceService.balanceEnquiry(this.accountNumber).subscribe(
        (response) => {
            this.balanceInfo = response.accountInfo;
            this.errorMessage = ''

      },
  (error: { error: { message: string } }) => { 
          error?.error?.message || 'An unexpected error occurred.';
        this.balanceInfo = null;
      }
    );
  }
}
}
