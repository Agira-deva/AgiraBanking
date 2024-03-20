import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authToken: string | null = null;

  constructor(private httpClient: HttpClient) {}

  userLogin(data: any) {
    return this.httpClient.post('http://localhost:8080/api/user/login', data);
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('token')!=null;;
  }

  setAuthToken(token: string): void {
    this.authToken = token;
    localStorage.setItem('authToken', token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  clearAuthToken(): void {
    this.authToken = null;
    localStorage.removeItem('authToken');
  }
}
