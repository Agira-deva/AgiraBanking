import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../service/history.service';
import { Transaction } from '../Interface/history';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  transactions: Transaction[] = [];
  accountNumber: string = '';
  startDate: string = '';
  endDate: string = '';

  constructor(private transactionService: HistoryService) {}

  ngOnInit(): void {
    const accountNumberFromStorage = sessionStorage.getItem('accountNumber');
    if (accountNumberFromStorage !== null) {
      this.accountNumber = accountNumberFromStorage;
    } else {
      this.accountNumber = ''; // or any other default value
    }
  }

  fetchTransactions(): void {
    if (this.accountNumber && this.startDate && this.endDate) {
      this.transactionService
        .getTransactionsByDateRange(
          this.accountNumber,
          this.startDate,
          this.endDate
        )
        .subscribe(
          (data: Transaction[]) => {
            this.transactions = data.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
          },
          (error: any) => {
            console.error('Error fetching transactions:', error);
          }
        );
    }
  }

}
