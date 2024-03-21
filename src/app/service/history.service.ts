import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../Interface/history';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private apiUrl = 'http://localhost:8080/bankStatement'; // Update the API URL

  constructor(private http: HttpClient) {}

  getTransactionHistory(accountNumber: string, startDate: Date, endDate: Date): Observable<Transaction[]> {
    const url = `${this.apiUrl}/pdf?accountNumber=${accountNumber}&startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<Transaction[]>(url);
  }
}
