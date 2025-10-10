import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../shared/services/modal.service';
import { LoginModalComponent } from '../auth/login-modal/login-modal.component';
import { RegisterModalComponent } from '../auth/register-modal/register-modal.component';

@Component({
  selector: 'app-modal-demo',
  standalone: true,
  imports: [CommonModule, LoginModalComponent, RegisterModalComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="bg-teal-700 text-white h-10 w-10 grid place-content-center rounded-xl">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3z"
                  />
                </svg>
              </div>
              <div>
                <h1 class="text-xl font-semibold text-gray-900">School Kit</h1>
                <p class="text-sm text-gray-500">Modal Demo</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <button
                (click)="openLoginModal()"
                class="px-4 py-2 text-sm font-medium text-teal-700 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
              >
                Sign In
              </button>
              <button
                (click)="openRegisterModal()"
                class="px-4 py-2 text-sm font-medium text-white bg-teal-700 rounded-lg hover:bg-teal-800 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-6 py-16">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-6">Experience Our Modal Authentication</h1>
          <p class="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Try out our beautifully designed login and registration modals with smooth animations,
            responsive design, and intuitive user experience.
          </p>

          <!-- Demo Cards -->
          <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <!-- Login Modal Card -->
            <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div
                class="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-6"
              >
                <svg
                  class="w-8 h-8 text-teal-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Login Modal</h3>
              <p class="text-gray-600 mb-6">
                Clean and focused login experience with social authentication options and form
                validation.
              </p>
              <div class="space-y-3 text-sm text-gray-500 mb-8">
                <div class="flex items-center justify-center gap-2">
                  <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Email & Password Authentication</span>
                </div>
                <div class="flex items-center justify-center gap-2">
                  <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Google OAuth Integration</span>
                </div>
                <div class="flex items-center justify-center gap-2">
                  <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Form Validation & Error Handling</span>
                </div>
              </div>
              <button
                (click)="openLoginModal()"
                class="w-full px-6 py-3 bg-teal-700 text-white font-medium rounded-lg hover:bg-teal-800 transition-colors"
              >
                Try Login Modal
              </button>
            </div>

            <!-- Register Modal Card -->
            <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div
                class="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6"
              >
                <svg
                  class="w-8 h-8 text-blue-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Registration Modal</h3>
              <p class="text-gray-600 mb-6">
                Multi-step registration flow with progress tracking and comprehensive form fields.
              </p>
              <div class="space-y-3 text-sm text-gray-500 mb-8">
                <div class="flex items-center justify-center gap-2">
                  <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>3-Step Registration Process</span>
                </div>
                <div class="flex items-center justify-center gap-2">
                  <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Progress Tracking Sidebar</span>
                </div>
                <div class="flex items-center justify-center gap-2">
                  <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Institution Setup Wizard</span>
                </div>
              </div>
              <button
                (click)="openRegisterModal()"
                class="w-full px-6 py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors"
              >
                Try Register Modal
              </button>
            </div>
          </div>

          <!-- Features Grid -->
          <div class="mt-20 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div class="text-center">
              <div
                class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4"
              >
                <svg
                  class="w-6 h-6 text-purple-600"
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
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p class="text-gray-600">
                Optimized animations and smooth transitions for the best user experience.
              </p>
            </div>

            <div class="text-center">
              <div
                class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4"
              >
                <svg
                  class="w-6 h-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.25-4.5L12 3l-8.25 4.5L12 12l8.25-4.5L12 3z"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Fully Responsive</h3>
              <p class="text-gray-600">
                Perfect experience across all devices from mobile to desktop.
              </p>
            </div>

            <div class="text-center">
              <div
                class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4"
              >
                <svg
                  class="w-6 h-6 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Secure by Design</h3>
              <p class="text-gray-600">
                Built-in security features and form validation to protect user data.
              </p>
            </div>
          </div>
        </div>
      </main>

      <!-- Modals -->
      <app-login-modal
        *ngIf="showLoginModal"
        (closeModal)="closeLoginModal()"
        (switchToRegisterModal)="switchToRegister()"
      ></app-login-modal>

      <app-register-modal
        *ngIf="showRegisterModal"
        (closeModal)="closeRegisterModal()"
        (switchToLoginModal)="switchToLogin()"
      ></app-register-modal>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class ModalDemoComponent {
  showLoginModal = false;
  showRegisterModal = false;

  constructor(private modalService: ModalService) {}

  openLoginModal() {
    this.showLoginModal = true;
    this.showRegisterModal = false;
  }

  openRegisterModal() {
    this.showRegisterModal = true;
    this.showLoginModal = false;
  }

  closeLoginModal() {
    this.showLoginModal = false;
  }

  closeRegisterModal() {
    this.showRegisterModal = false;
  }

  switchToRegister() {
    this.showLoginModal = false;
    this.showRegisterModal = true;
  }

  switchToLogin() {
    this.showRegisterModal = false;
    this.showLoginModal = true;
  }
}
