import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingStateService } from '../shared/onboarding-state.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  middleName: string = '';
  phone: string = '';
  gender: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  acceptTerms: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  steps = [
    {
      title: 'Bio Data',
      subtitle: 'Fill in your personal profile to get started.',
    },
    {
      title: 'School Information',
      subtitle: 'Tell us about the institution you represent.',
    },
    {
      title: 'Review & Submit',
      subtitle: 'Confirm your entries before submission.',
    },
  ];
  activeStepIndex = 0;

  constructor(private router: Router, private onboardingState: OnboardingStateService) {}

  ngOnInit(): void {
    const savedBio = this.onboardingState.getBioData();
    if (savedBio) {
      this.firstName = savedBio.firstName;
      this.lastName = savedBio.lastName;
      this.middleName = savedBio.middleName;
      this.phone = savedBio.phone;
      this.gender = savedBio.gender;
      this.email = savedBio.email;
      this.password = savedBio.password;
      this.confirmPassword = savedBio.password;
      this.acceptTerms = savedBio.acceptTerms;
    }
  }

  onSubmit() {
    if (!this.acceptTerms) {
      alert('You must accept the terms and conditions');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.onboardingState.setBioData({
      firstName: this.firstName,
      lastName: this.lastName,
      middleName: this.middleName,
      phone: this.phone,
      gender: this.gender,
      email: this.email,
      password: this.password,
      acceptTerms: this.acceptTerms,
    });

    // Proceed to institution information step
    this.router.navigate(['/auth/school-information']);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
