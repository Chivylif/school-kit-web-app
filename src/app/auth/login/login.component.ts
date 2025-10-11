import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(public router: Router) {}

  onSubmit() {
    // Handle login logic here
    console.log('Login attempt:', { email: this.email, password: this.password });

    // Simple validation for demo purposes
    if (this.email && this.password) {
      // Show loader
      this.isLoading = true;

      // Simulate login API call with timeout
      setTimeout(() => {
        // Hide loader and navigate to dashboard
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      }, 2000); // 2 second delay to show loader
    } else {
      console.log('Please enter both email and password');
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }

  navigateToForgotPassword() {
    this.router.navigate(['/auth/forgot-password']);
  }

  loginWithGoogle() {
    // Handle Google login
    console.log('Google login');
  }
}
