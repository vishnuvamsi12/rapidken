import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;

  login() {
    // Perform the login logic, e.g., validate credentials
    // Set isLoggedIn to true if the login is successful
    this.isLoggedIn = true;
  }

  logout() {
    // Perform the logout logic
    // Set isLoggedIn to false
    this.isLoggedIn = false;
  }
}
