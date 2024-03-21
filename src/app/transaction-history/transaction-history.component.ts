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
  accountNumber: string = ''; // Assuming the account number is stored somewhere
  startDate: Date | null = null; // Change type to Date or null
  endDate: Date | null = null; // Change type to Date or null

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    this.accountNumber = sessionStorage.getItem('accountNumber') || '';

    if (this.accountNumber) {
      this.loadTransactionHistory();
    }
  }

  loadTransactionHistory(): void {
    if (this.accountNumber && this.startDate && this.endDate) {
      this.historyService.getTransactionHistory(this.accountNumber, this.startDate, this.endDate).subscribe(
        (data: Transaction[]) => {
          this.transactions = data;
        },
        (error: any) => {
          console.error('Error fetching transaction history:', error);
        }
      );
    }
  }

  filterTransactions(): void {
    console.log('Account Number:', this.accountNumber);
    console.log('Start Date:', this.startDate);
    console.log('End Date:', this.endDate);

    if (this.accountNumber && this.startDate && this.endDate) {
      this.loadTransactionHistory();
    }
  }

  onStartDateChange(startDate: string): void {
    this.startDate = startDate ? new Date(startDate) : null;
    this.filterTransactions();
  }

  onEndDateChange(endDate: string): void {
    this.endDate = endDate ? new Date(endDate) : null;
    this.filterTransactions();
  }
  // images:any=[{

  //   imageUrl:'./assets/ai-transaction-banking-1693602794.jpg'
  // }]
}
