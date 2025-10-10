import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-congratulations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './congratulations.component.html',
  styleUrl: './congratulations.component.css',
})
export class CongratulationsComponent {
  constructor(private router: Router) {}

  continueToDashboard() {
    this.router.navigate(['/onboarding']);
  }

  checkEmail() {
    // Open email client or show email verification instructions
    console.log('Check email clicked');
  }

  resendEmail() {
    // Handle resend email action
    console.log('Resend email clicked');
    alert('Verification email resent! Please check your inbox.');
  }
}
