import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }
  // Method to save the JWT token in local storage
  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  // Method to retrieve the JWT token from local storage
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // Method to remove the JWT token from local storage
  destroyToken(): void {
    localStorage.clear();
  }
}
