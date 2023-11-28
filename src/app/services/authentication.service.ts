import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isLoggedIn = true;

  login() {
    // Implement your login logic here
    this.isLoggedIn = false;
  }

  logout() {
    // Implement your logout logic here
    this.isLoggedIn = true;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
