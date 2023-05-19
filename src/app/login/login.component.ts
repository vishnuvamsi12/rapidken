import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.username === 'admin' && this.password === 'admin') {
      // Store the login status in local storage
      localStorage.setItem('isLoggedIn', 'true');
  
      // Redirect to the employees listing page
      this.router.navigate(['/employees']);
    } else {
      alert('Invalid username or password');
    }
  }
}
