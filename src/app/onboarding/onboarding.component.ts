import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface OnboardingData {
  firstName: string;
  lastName: string;
  schoolName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  mobileCarrier: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  address: string;
}

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.css',
})
export class OnboardingComponent {
  currentStep: number = 1;
  totalSteps: number = 4;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  data: OnboardingData = {
    firstName: '',
    lastName: '',
    schoolName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    mobileCarrier: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    address: '',
  };

  passwordRequirements = {
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  };

  constructor(public router: Router) {}

  checkPasswordRequirements() {
    const password = this.data.password;
    this.passwordRequirements = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  }

  get isPasswordValid(): boolean {
    return Object.values(this.passwordRequirements).every((req) => req);
  }

  get passwordsMatch(): boolean {
    return this.data.password === this.data.confirmPassword && this.data.confirmPassword !== '';
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  canProceed(): boolean {
    switch (this.currentStep) {
      case 1:
        return !!(
          this.data.firstName &&
          this.data.lastName &&
          this.data.schoolName &&
          this.data.email
        );
      case 2:
        return !!(this.data.phoneNumber && this.data.gender && this.data.mobileCarrier);
      case 3:
        return this.isPasswordValid && this.passwordsMatch;
      case 4:
        return this.data.agreeToTerms && !!this.data.address;
      default:
        return false;
    }
  }

  onSubmit() {
    if (this.currentStep === this.totalSteps && this.canProceed()) {
      console.log('Onboarding complete:', this.data);
      // Navigate to congratulations or main app
      this.router.navigate(['/auth/congratulations']);
    } else if (this.canProceed()) {
      this.nextStep();
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  getStepTitle(): string {
    switch (this.currentStep) {
      case 1:
        return 'Register Institution';
      case 2:
        return 'Personal Information';
      case 3:
        return 'Setup Password';
      case 4:
        return 'Complete Registration';
      default:
        return 'Onboarding';
    }
  }

  getStepSubtitle(): string {
    switch (this.currentStep) {
      case 1:
        return 'Create your institution profile and manage on the go';
      case 2:
        return 'Tell us more about yourself';
      case 3:
        return 'Secure your account by setting up a strong password';
      case 4:
        return 'Final step to complete your registration';
      default:
        return '';
    }
  }

  formatStepNumber(step: number): string {
    return step.toString().padStart(2, '0');
  }
}
