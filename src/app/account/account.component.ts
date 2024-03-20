import { Component } from '@angular/core';
import { AccountService } from '../service/account.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  accountNumber!: string;
  balanceInfo: any;
  errorMessage!: string;

  constructor(private balanceService: AccountService, private authService: AuthService) {}

  onSubmit(): void {
    const storedAccountNumber = sessionStorage.getItem('accountNumber');
    if (storedAccountNumber) {
      this.accountNumber = storedAccountNumber;
      this.balanceService.balanceEnquiry(this.accountNumber).subscribe(
        (response) => {
          this.balanceInfo = response.accountInfo;
          this.errorMessage = '';
        },
        (error: { error: { message: string } }) => {
          this.errorMessage =  'An unexpected error occurred while fetching balance.';
          this.balanceInfo = null;
        }
      );
    } else {
      this.errorMessage = 'Account number not found in session storage.';
      this.balanceInfo = null;
    }
  }
}
