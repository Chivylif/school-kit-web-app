import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalBaseComponent } from '../../shared/components/modal-base/modal-base.component';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalBaseComponent],
  template: `
    <app-modal-base [isVisible]="isVisible" (modalClose)="close()" [showCloseButton]="true">
      <div class="flex h-full">
        <!-- Left side - Branding -->
        <div
          class="hidden md:flex w-80 bg-gradient-to-br from-[#0B3F40] via-[#0E4E52] to-[#072829] text-white flex-col justify-center p-8 relative overflow-hidden"
        >
          <div class="absolute -left-8 -top-12 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
          <div
            class="absolute -right-12 bottom-5 h-36 w-36 rounded-full bg-teal-300/10 blur-2xl"
          ></div>

          <div class="relative z-10">
            <div class="flex items-center gap-3 mb-8">
              <div
                class="bg-yellow-400/90 text-teal-900 h-10 w-10 grid place-content-center rounded-xl shadow-lg"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-xs uppercase tracking-wider text-teal-100/70">School Kit</p>
                <p class="text-lg font-semibold">Welcome Back</p>
              </div>
            </div>

            <div class="space-y-4">
              <h2 class="text-xl font-semibold">Sign in to continue</h2>
              <p class="text-sm text-teal-100/70 leading-relaxed">
                Access your school management dashboard and continue where you left off.
              </p>
            </div>

            <div class="mt-8 space-y-4">
              <div class="flex items-center gap-3">
                <div class="bg-yellow-400/20 rounded-lg p-2">
                  <svg
                    class="w-4 h-4 text-yellow-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span class="text-sm">Secure authentication</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="bg-yellow-400/20 rounded-lg p-2">
                  <svg
                    class="w-4 h-4 text-yellow-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <span class="text-sm">Real-time updates</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right side - Form -->
        <div class="flex-1 p-8 overflow-y-auto">
          <div class="max-w-md mx-auto">
            <div class="text-center mb-8">
              <h1 class="text-2xl font-semibold text-gray-900 mb-2">Sign In</h1>
              <p class="text-sm text-gray-500">Enter your credentials to continue</p>
            </div>

            <form class="space-y-5" (ngSubmit)="onSubmit()" #loginForm="ngForm">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2"
                  >Email address</label
                >
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  [(ngModel)]="email"
                  #emailRef="ngModel"
                  class="form-field"
                  placeholder="name@institution.com"
                />
                <div *ngIf="emailRef.invalid && emailRef.touched" class="mt-1 text-xs text-red-600">
                  Please enter a valid email address
                </div>
              </div>

              <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-2"
                  >Password</label
                >
                <div class="relative">
                  <input
                    id="password"
                    name="password"
                    [type]="showPassword ? 'text' : 'password'"
                    required
                    [(ngModel)]="password"
                    #passwordRef="ngModel"
                    class="form-field form-field--with-icon"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    (click)="togglePassword()"
                    class="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-500 transition-colors"
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
                <div
                  *ngIf="passwordRef.invalid && passwordRef.touched"
                  class="mt-1 text-xs text-red-600"
                >
                  Password is required
                </div>
              </div>

              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center">
                  <input id="remember" name="remember" type="checkbox" class="form-checkbox" />
                  <label for="remember" class="ml-2 text-gray-600">Remember me</label>
                </div>
                <button
                  type="button"
                  (click)="navigateToForgotPassword()"
                  class="text-teal-700 font-medium hover:text-teal-800 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <div class="space-y-4">
                <button type="submit" [disabled]="loginForm.invalid" class="primary-button w-full">
                  Sign In to Account
                </button>

                <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-gray-200"></div>
                  </div>
                  <div class="relative flex justify-center text-xs">
                    <span class="px-3 bg-white text-gray-500">or continue with</span>
                  </div>
                </div>

                <button type="button" (click)="loginWithGoogle()" class="secondary-button w-full">
                  <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </button>

                <div class="text-center pt-2">
                  <p class="text-sm text-gray-500">
                    Don't have an account?
                    <button
                      type="button"
                      (click)="switchToRegister()"
                      class="text-teal-700 font-semibold hover:text-teal-800 underline underline-offset-4 transition-colors"
                    >
                      Create one here
                    </button>
                  </p>
                </div>
              </div>
            </form>
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
        border: 1.5px solid #e2e8f0;
        background-color: #ffffff;
        color: #374151;
        border-radius: 8px;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 1px 2px rgba(15, 118, 110, 0.04);
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
        border-radius: 4px;
        border: 1.5px solid #d1d5db;
        color: #0d9488;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
      }

      .primary-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.875rem 2rem;
        font-size: 0.95rem;
        font-weight: 600;
        color: #ffffff;
        background-color: #0f766e;
        border: 2px solid #0f766e;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(15, 118, 110, 0.15);
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .primary-button:hover:not(:disabled) {
        background-color: #115e59;
        border-color: #115e59;
        transform: translateY(-1px);
      }

      .primary-button:disabled {
        background-color: #94a3b8;
        border-color: #94a3b8;
        cursor: not-allowed;
        transform: none;
      }

      .secondary-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.875rem 2rem;
        font-size: 0.95rem;
        font-weight: 500;
        color: #374151;
        background-color: #ffffff;
        border: 1.5px solid #e2e8f0;
        border-radius: 8px;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .secondary-button:hover {
        border-color: #0f766e;
        color: #0f766e;
        transform: translateY(-1px);
      }
    `,
  ],
})
export class LoginModalComponent {
  @Output() switchToRegisterModal = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  isVisible: boolean = true;
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.email && this.password) {
      console.log('Login attempt:', { email: this.email, password: this.password });
      // Handle login logic here
      this.close();
    }
  }

  loginWithGoogle() {
    console.log('Google login');
    // Handle Google login
  }

  navigateToForgotPassword() {
    this.close();
    this.router.navigate(['/auth/forgot-password']);
  }

  switchToRegister() {
    this.switchToRegisterModal.emit();
  }

  close() {
    this.closeModal.emit();
  }
}
