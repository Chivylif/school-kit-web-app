import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalBaseComponent } from '../../shared/components/modal-base/modal-base.component';

interface Step {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalBaseComponent],
  template: `
    <app-modal-base
      [isVisible]="isVisible"
      (modalClose)="close()"
      [showCloseButton]="true"
      [size]="'xl'"
    >
      <div class="flex h-full min-h-[85vh] max-h-[95vh]">
        <!-- Left side - Progress and Branding -->
        <div
          class="hidden md:flex w-96 bg-gradient-to-br from-[#0B3F40] via-[#0E4E52] to-[#072829] text-white flex-col p-8 relative overflow-hidden"
        >
          <div class="absolute -left-8 -top-12 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
          <div
            class="absolute -right-12 bottom-5 h-36 w-36 rounded-full bg-teal-300/10 blur-2xl"
          ></div>

          <div class="relative z-10 flex flex-col h-full">
            <div class="flex items-center gap-3 mb-8">
              <div
                class="bg-yellow-400/90 text-teal-900 h-10 w-10 grid place-content-center shadow-lg"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-xs uppercase tracking-wider text-teal-100/70">School Kit</p>
                <p class="text-lg font-semibold">Institution Onboarding</p>
              </div>
            </div>

            <div class="space-y-3 mb-8">
              <h2 class="text-xl font-semibold">
                Let's help you set up your institution profile in a few guided steps.
              </h2>
              <p class="text-sm text-teal-100/70 leading-relaxed">
                Fill in the details below and keep an eye on the progress tracker to know exactly
                where you are in the process.
              </p>

              <button
                (click)="navigateToFullPage()"
                class="full-page-button mt-4 px-4 py-2 bg-yellow-400/20 hover:bg-yellow-400/30 border border-yellow-400 text-yellow-400 hover:text-yellow-300 transition-all duration-200 flex items-center gap-2 text-sm font-medium rounded-lg"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  ></path>
                </svg>
                Use Full Page View
              </button>
            </div>

            <!-- Progress Steps -->
            <nav class="space-y-4 flex-1">
              <div *ngFor="let step of steps; let index = index" class="flex items-start">
                <div class="flex flex-col items-center mr-3">
                  <div
                    class="h-8 w-8 grid place-content-center text-xs font-bold transition-all duration-300"
                    [ngClass]="{
                      'bg-yellow-400 text-teal-900': index === activeStepIndex,
                      'bg-white/10 text-white/90': index !== activeStepIndex
                    }"
                  >
                    {{ index + 1 }}
                  </div>
                  <div
                    *ngIf="index < steps.length - 1"
                    class="flex-1 w-px mt-2 mb-2 bg-white/20"
                    style="height: 24px;"
                  ></div>
                </div>
                <div class="flex-1 pb-4">
                  <h3
                    class="text-sm font-medium transition-colors"
                    [ngClass]="{
                      'text-white': index === activeStepIndex,
                      'text-white/70': index !== activeStepIndex
                    }"
                  >
                    {{ step.title }}
                  </h3>
                  <p
                    class="text-xs mt-1 transition-colors"
                    [ngClass]="{
                      'text-teal-100/90': index === activeStepIndex,
                      'text-teal-100/50': index !== activeStepIndex
                    }"
                  >
                    {{ step.description }}
                  </p>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <!-- Right side - Form -->
        <div class="flex-1 flex flex-col">
          <!-- Header -->
          <div class="p-6 border-b border-gray-100">
            <h1 class="text-2xl font-semibold text-gray-900">{{ getCurrentStep().title }}</h1>
            <p class="text-sm text-gray-500 mt-1">{{ getCurrentStep().description }}</p>
          </div>

          <!-- Form Content -->
          <div class="flex-1 p-6 overflow-y-auto">
            <form class="space-y-5" (ngSubmit)="onSubmit()" #registerForm="ngForm">
              <!-- Step 1: Bio Data -->
              <div *ngIf="activeStepIndex === 0" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2"
                      >First Name *</label
                    >
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      [(ngModel)]="formData.firstName"
                      class="form-field"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label for="middleName" class="block text-sm font-medium text-gray-700 mb-2"
                      >Middle Name</label
                    >
                    <input
                      id="middleName"
                      name="middleName"
                      type="text"
                      [(ngModel)]="formData.middleName"
                      class="form-field"
                      placeholder="Enter middle name"
                    />
                  </div>
                  <div>
                    <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2"
                      >Last Name *</label
                    >
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      [(ngModel)]="formData.lastName"
                      class="form-field"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="gender" class="block text-sm font-medium text-gray-700 mb-2"
                      >Gender *</label
                    >
                    <select
                      id="gender"
                      name="gender"
                      required
                      [(ngModel)]="formData.gender"
                      class="form-field"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700 mb-2"
                      >Phone Number *</label
                    >
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      [(ngModel)]="formData.phone"
                      class="form-field"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2"
                    >Email Address *</label
                  >
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    [(ngModel)]="formData.email"
                    class="form-field"
                    placeholder="Enter email address"
                  />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-2"
                      >Password *</label
                    >
                    <div class="relative">
                      <input
                        id="password"
                        name="password"
                        [type]="showPassword ? 'text' : 'password'"
                        required
                        [(ngModel)]="formData.password"
                        class="form-field form-field--with-icon"
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        (click)="togglePassword()"
                        class="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-500"
                      >
                        <svg
                          *ngIf="!showPassword"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.8"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.8"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        <svg
                          *ngIf="showPassword"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.8"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                          />
                        </svg>
                      </button>
                    </div>
                    <div class="password-info-box">
                      <p class="text-xs font-medium text-gray-700 mb-2">Password requirements:</p>
                      <ul class="text-xs text-gray-600 space-y-1">
                        <li>• At least 8 characters long</li>
                        <li>• Contains uppercase and lowercase letters</li>
                        <li>• Contains at least one number</li>
                        <li>• Contains at least one special character</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <label
                      for="confirmPassword"
                      class="block text-sm font-medium text-gray-700 mb-2"
                      >Confirm Password *</label
                    >
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      [(ngModel)]="formData.confirmPassword"
                      class="form-field"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>
              </div>

              <!-- Step 2: School Information -->
              <div *ngIf="activeStepIndex === 1" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      for="institutionName"
                      class="block text-sm font-medium text-gray-700 mb-2"
                      >Institution Name *</label
                    >
                    <input
                      id="institutionName"
                      name="institutionName"
                      type="text"
                      required
                      [(ngModel)]="formData.institutionName"
                      class="form-field"
                      placeholder="e.g., Springfield High School"
                    />
                  </div>
                  <div>
                    <label
                      for="institutionType"
                      class="block text-sm font-medium text-gray-700 mb-2"
                      >Institution Type *</label
                    >
                    <select
                      id="institutionType"
                      name="institutionType"
                      required
                      [(ngModel)]="formData.institutionType"
                      class="form-field"
                    >
                      <option value="">Select type</option>
                      <option value="primary">Primary School</option>
                      <option value="secondary">Secondary School</option>
                      <option value="university">University</option>
                      <option value="college">College</option>
                      <option value="technical">Technical Institute</option>
                      <option value="vocational">Vocational School</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label for="address" class="block text-sm font-medium text-gray-700 mb-2"
                    >Institution Address *</label
                  >
                  <textarea
                    id="address"
                    name="address"
                    required
                    [(ngModel)]="formData.address"
                    class="form-field"
                    rows="3"
                    placeholder="Complete institution address including city, state, and postal code"
                  ></textarea>
                </div>
              </div>

              <!-- Step 3: Account Security -->
              <div *ngIf="activeStepIndex === 2" class="space-y-4">
                <div>
                  <label for="password" class="block text-sm font-medium text-gray-700 mb-2"
                    >Password *</label
                  >
                  <div class="relative">
                    <input
                      id="password"
                      name="password"
                      [type]="showPassword ? 'text' : 'password'"
                      required
                      [(ngModel)]="formData.password"
                      class="form-field form-field--with-icon"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      (click)="togglePassword()"
                      class="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-500"
                    >
                      <svg
                        *ngIf="!showPassword"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.8"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.8"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <svg
                        *ngIf="showPassword"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.8"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2"
                    >Confirm Password *</label
                  >
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    [(ngModel)]="formData.confirmPassword"
                    class="form-field"
                    placeholder="Confirm your password"
                  />
                </div>

                <div class="flex items-start">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    [(ngModel)]="formData.acceptTerms"
                    class="form-checkbox mt-1"
                  />
                  <label for="terms" class="ml-2 text-sm text-gray-600">
                    I agree to the
                    <a href="#" class="text-teal-700 hover:text-teal-800">Terms of Service</a> and
                    <a href="#" class="text-teal-700 hover:text-teal-800">Privacy Policy</a>
                  </label>
                </div>
              </div>
            </form>
          </div>

          <!-- Footer Actions -->
          <div class="p-6 border-t border-gray-100 flex items-center justify-between">
            <button
              *ngIf="activeStepIndex > 0"
              type="button"
              (click)="previousStep()"
              class="secondary-button"
            >
              Previous
            </button>
            <div class="flex-1"></div>

            <div class="flex items-center gap-3">
              <button
                type="button"
                (click)="switchToLogin()"
                class="text-sm text-gray-500 hover:text-gray-700"
              >
                Already have an account? <span class="text-teal-700 font-medium">Sign in</span>
              </button>

              <button
                *ngIf="activeStepIndex < steps.length - 1"
                type="button"
                (click)="nextStep()"
                [disabled]="!isCurrentStepValid()"
                class="primary-button"
              >
                Continue
              </button>

              <button
                *ngIf="activeStepIndex === steps.length - 1"
                type="button"
                (click)="onSubmit()"
                [disabled]="!isCurrentStepValid()"
                class="primary-button"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </app-modal-base>
  `,
  styles: [
    `
      .form-field {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1.5px solid #94a3b8;
        background-color: #ffffff;
        color: #374151;
        border-radius: 8px;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        font-size: 0.95rem;
      }

      .form-field:focus {
        outline: none;
        border-color: #0f766e;
        box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
      }

      .form-field--with-icon {
        padding-right: 3rem;
      }

      .form-checkbox {
        height: 1rem;
        width: 1rem;
        border-radius: 0;
        border: 1.5px solid #d1d5db;
        color: #0d9488;
        cursor: pointer;
      }

      .primary-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem 1.5rem;
        font-size: 0.9rem;
        font-weight: 600;
        color: #ffffff;
        background-color: #0f766e;
        border: 2px solid #0f766e;
        border-radius: 8px;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .primary-button:hover:not(:disabled) {
        background-color: #115e59;
        border-color: #115e59;
      }

      .primary-button:disabled {
        background-color: #94a3b8;
        border-color: #94a3b8;
        cursor: not-allowed;
      }

      .secondary-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem 1.5rem;
        font-size: 0.9rem;
        font-weight: 500;
        color: #374151;
        background-color: #ffffff;
        border: 1.5px solid #94a3b8;
        border-radius: 8px;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .secondary-button:hover {
        border-color: #0f766e;
        color: #0f766e;
      }

      .password-info-box {
        background-color: #f8fafc;
        border: 1px solid #94a3b8;
        border-radius: 8px;
        padding: 12px;
        margin-top: 8px;
      }

      .full-page-button {
        background: rgba(251, 191, 36, 0.1);
        border: 1px solid #fbbf24;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .full-page-button:hover {
        background: rgba(251, 191, 36, 0.2);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
      }

      .full-page-button:hover svg {
        transform: scale(1.1);
      }
    `,
  ],
})
export class RegisterModalComponent {
  @Output() switchToLoginModal = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  isVisible: boolean = true;
  activeStepIndex: number = 0;
  showPassword: boolean = false;

  steps: Step[] = [
    {
      id: 'biodata',
      title: 'Bio Data',
      description: 'Fill in your personal profile to get started.',
      completed: false,
    },
    {
      id: 'school',
      title: 'School Information',
      description: 'Tell us about the institution you represent.',
      completed: false,
    },
    {
      id: 'review',
      title: 'Review & Submit',
      description: 'Confirm your entries before submission.',
      completed: false,
    },
  ];

  formData = {
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    institutionName: '',
    institutionType: '',
    address: '',
    acceptTerms: false,
  };

  constructor(private router: Router) {}

  navigateToFullPage(): void {
    console.log('Navigating to full page register...');
    this.closeModal.emit();
    this.router.navigate(['/auth/register']).then(
      (success) => {
        console.log('Navigation successful:', success);
      },
      (error) => {
        console.error('Navigation failed:', error);
      }
    );
  }

  getCurrentStep(): Step {
    return this.steps[this.activeStepIndex];
  }

  isCurrentStepValid(): boolean {
    switch (this.activeStepIndex) {
      case 0:
        return !!(
          this.formData.firstName &&
          this.formData.lastName &&
          this.formData.gender &&
          this.formData.phone &&
          this.formData.email &&
          this.formData.password &&
          this.formData.confirmPassword &&
          this.formData.password === this.formData.confirmPassword
        );
      case 1:
        return !!(
          this.formData.institutionName &&
          this.formData.institutionType &&
          this.formData.address
        );
      case 2:
        return !!this.formData.acceptTerms;
      default:
        return false;
    }
  }

  nextStep() {
    if (this.isCurrentStepValid() && this.activeStepIndex < this.steps.length - 1) {
      this.steps[this.activeStepIndex].completed = true;
      this.activeStepIndex++;
    }
  }

  previousStep() {
    if (this.activeStepIndex > 0) {
      this.activeStepIndex--;
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.isCurrentStepValid()) {
      console.log('Registration data:', this.formData);
      // Handle registration logic here
      this.close();
    }
  }

  switchToLogin() {
    this.switchToLoginModal.emit();
  }

  close() {
    this.closeModal.emit();
  }
}
