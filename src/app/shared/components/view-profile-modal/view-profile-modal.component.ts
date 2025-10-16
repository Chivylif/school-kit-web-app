import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalBaseComponent } from '../modal-base/modal-base.component';

export interface SecurityInfo {
  lastPasswordChange: string;
  twoFactorEnabled: boolean;
  lastLogin: string;
  loginAttempts: number;
  accountLocked: boolean;
}

export interface UserProfile {
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
  dateJoined: string;
  status: 'Active' | 'Inactive';
  avatar?: string;
  profileImage?: string;
  initials: string;
  security?: SecurityInfo;
}

@Component({
  selector: 'app-view-profile-modal',
  standalone: true,
  imports: [CommonModule, ModalBaseComponent, ReactiveFormsModule],
  template: `
    <app-modal-base [isVisible]="isVisible" [size]="'lg'" (modalClose)="onClose()">
      <div class="flex flex-col h-full max-h-[90vh]">
        <!-- Header -->
        <div
          class="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-teal-50"
        >
          <h2 class="text-xl font-semibold text-slate-900">Profile Information</h2>
          <p class="text-sm text-slate-600 mt-1">View and manage your account details</p>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto">
          <div class="p-6">
            <!-- Profile Header -->
            <div class="flex items-start gap-4 mb-6">
              <div class="flex-shrink-0 relative">
                <!-- Profile Image or Initials -->
                <div class="relative">
                  <!-- Image Display -->
                  <div
                    *ngIf="userProfile.profileImage || previewImageUrl"
                    class="h-20 w-20 rounded-2xl overflow-hidden shadow-lg"
                  >
                    <img
                      [src]="previewImageUrl || userProfile.profileImage"
                      [alt]="userProfile.name + ' profile picture'"
                      class="h-full w-full object-cover"
                    />
                  </div>

                  <!-- Initials Fallback -->
                  <div
                    *ngIf="!userProfile.profileImage && !previewImageUrl"
                    class="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-2xl font-semibold text-white shadow-lg"
                  >
                    {{ userProfile.initials }}
                  </div>

                  <!-- Edit Overlay (only in edit mode) -->
                  <div
                    *ngIf="isEditing"
                    class="absolute inset-0 bg-black bg-opacity-40 rounded-2xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer image-upload-overlay"
                    (click)="fileInput.click()"
                    title="Click to change profile picture"
                  >
                    <div class="text-center">
                      <svg
                        class="h-6 w-6 text-white mx-auto mb-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span class="text-xs text-white">Upload</span>
                    </div>
                  </div>
                </div>

                <!-- Hidden File Input -->
                <input
                  #fileInput
                  type="file"
                  id="profileImageInput"
                  accept="image/*"
                  (change)="onImageFileSelected($event)"
                  class="hidden"
                />

                <!-- Image Upload Actions (only in edit mode with selected file) -->
                <div
                  *ngIf="isEditing && selectedImageFile"
                  class="absolute -bottom-2 -right-2 flex gap-1"
                >
                  <button
                    type="button"
                    (click)="onUploadImage()"
                    [disabled]="isUploadingImage"
                    class="upload-button inline-flex items-center justify-center w-8 h-8 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400 text-white rounded-full shadow-lg transition-all"
                    title="Upload image"
                  >
                    <svg
                      *ngIf="!isUploadingImage"
                      class="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <svg
                      *ngIf="isUploadingImage"
                      class="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    (click)="clearImagePreview()"
                    class="upload-button inline-flex items-center justify-center w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all"
                    title="Cancel"
                  >
                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <!-- View Mode -->
                <div *ngIf="!isEditing">
                  <h3 class="text-2xl font-semibold text-slate-900">{{ userProfile.name }}</h3>
                  <p class="text-emerald-600 font-medium mt-1">{{ userProfile.role }}</p>
                  <div class="flex items-center gap-2 mt-2">
                    <span
                      class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                      [ngClass]="{
                        'bg-emerald-50 text-emerald-600': userProfile.status === 'Active',
                        'bg-red-50 text-red-600': userProfile.status === 'Inactive'
                      }"
                    >
                      <span
                        class="h-1.5 w-1.5 rounded-full"
                        [ngClass]="{
                          'bg-emerald-500': userProfile.status === 'Active',
                          'bg-red-500': userProfile.status === 'Inactive'
                        }"
                      ></span>
                      {{ userProfile.status }} Member
                    </span>
                  </div>
                </div>

                <!-- Edit Mode -->
                <div *ngIf="isEditing" class="space-y-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-slate-700 mb-2"
                        >First Name</label
                      >
                      <input
                        type="text"
                        formControlName="firstName"
                        [formGroup]="profileForm"
                        placeholder="Enter your first name"
                        class="form-field w-full"
                      />
                      <div
                        *ngIf="profileForm.get('firstName')?.errors?.['required'] && profileForm.get('firstName')?.touched"
                        class="mt-1 text-xs text-red-600"
                      >
                        First name is required
                      </div>
                      <div
                        *ngIf="profileForm.get('firstName')?.errors?.['minlength'] && profileForm.get('firstName')?.touched"
                        class="mt-1 text-xs text-red-600"
                      >
                        First name must be at least 2 characters long
                      </div>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        formControlName="lastName"
                        [formGroup]="profileForm"
                        placeholder="Enter your last name"
                        class="form-field w-full"
                      />
                      <div
                        *ngIf="profileForm.get('lastName')?.errors?.['required'] && profileForm.get('lastName')?.touched"
                        class="mt-1 text-xs text-red-600"
                      >
                        Last name is required
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-emerald-600 font-medium">{{ userProfile.role }}</span>
                    <span
                      class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                      [ngClass]="{
                        'bg-emerald-50 text-emerald-600': userProfile.status === 'Active',
                        'bg-red-50 text-red-600': userProfile.status === 'Inactive'
                      }"
                    >
                      <span
                        class="h-1.5 w-1.5 rounded-full"
                        [ngClass]="{
                          'bg-emerald-500': userProfile.status === 'Active',
                          'bg-red-500': userProfile.status === 'Inactive'
                        }"
                      ></span>
                      {{ userProfile.status }} Member
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Profile Details -->
            <div class="space-y-6">
              <!-- Contact Information -->
              <div>
                <h4 class="text-lg font-semibold text-slate-900 mb-4">Contact Information</h4>

                <!-- View Mode -->
                <div *ngIf="!isEditing" class="grid grid-cols-1 gap-4">
                  <div class="bg-slate-50 rounded-xl p-4">
                    <label class="block text-sm font-medium text-slate-700 mb-1"
                      >Email Address</label
                    >
                    <div class="flex items-center gap-2">
                      <svg
                        class="h-4 w-4 text-slate-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.6"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span class="text-slate-900">{{ userProfile.email }}</span>
                    </div>
                  </div>

                  <div class="bg-slate-50 rounded-xl p-4" *ngIf="userProfile.phone">
                    <label class="block text-sm font-medium text-slate-700 mb-1"
                      >Phone Number</label
                    >
                    <div class="flex items-center gap-2">
                      <svg
                        class="h-4 w-4 text-slate-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.6"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span class="text-slate-900">{{ userProfile.phone }}</span>
                    </div>
                  </div>
                </div>

                <!-- Edit Mode -->
                <form *ngIf="isEditing" [formGroup]="profileForm" class="space-y-4">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-slate-700 mb-2"
                        >Email Address</label
                      >
                      <input
                        type="email"
                        formControlName="email"
                        placeholder="Enter your email address"
                        class="form-field w-full"
                      />
                      <div
                        *ngIf="profileForm.get('email')?.errors?.['required'] && profileForm.get('email')?.touched"
                        class="mt-1 text-xs text-red-600"
                      >
                        Email is required
                      </div>
                      <div
                        *ngIf="profileForm.get('email')?.errors?.['email'] && profileForm.get('email')?.touched"
                        class="mt-1 text-xs text-red-600"
                      >
                        Please enter a valid email address
                      </div>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-slate-700 mb-2"
                        >Phone Number</label
                      >
                      <input
                        type="tel"
                        formControlName="phone"
                        placeholder="Enter your phone number"
                        class="form-field w-full"
                      />
                    </div>
                  </div>
                </form>
              </div>

              <!-- Additional Information -->
              <div>
                <h4 class="text-lg font-semibold text-slate-900 mb-4">Additional Information</h4>

                <!-- View Mode -->
                <div *ngIf="!isEditing" class="grid grid-cols-1 gap-4">
                  <div class="bg-slate-50 rounded-xl p-4" *ngIf="userProfile.address">
                    <label class="block text-sm font-medium text-slate-700 mb-1">Address</label>
                    <div class="flex items-start gap-2">
                      <svg
                        class="h-4 w-4 text-slate-400 mt-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.6"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.6"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span class="text-slate-900">{{ userProfile.address }}</span>
                    </div>
                  </div>

                  <div class="bg-slate-50 rounded-xl p-4">
                    <label class="block text-sm font-medium text-slate-700 mb-1"
                      >Member Since</label
                    >
                    <div class="flex items-center gap-2">
                      <svg
                        class="h-4 w-4 text-slate-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="1.6" />
                        <line x1="16" y1="2" x2="16" y2="6" stroke-width="1.6" />
                        <line x1="8" y1="2" x2="8" y2="6" stroke-width="1.6" />
                        <line x1="3" y1="10" x2="21" y2="10" stroke-width="1.6" />
                      </svg>
                      <span class="text-slate-900">{{ userProfile.dateJoined }}</span>
                    </div>
                  </div>
                </div>

                <!-- Edit Mode -->
                <div *ngIf="isEditing">
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-slate-700 mb-2">Address</label>
                      <textarea
                        formControlName="address"
                        [formGroup]="profileForm"
                        placeholder="Enter your address"
                        rows="3"
                        class="form-field w-full resize-none"
                      ></textarea>
                    </div>
                    <div class="bg-slate-50 rounded-xl p-4">
                      <label class="block text-sm font-medium text-slate-700 mb-1"
                        >Member Since</label
                      >
                      <div class="flex items-center gap-2">
                        <svg
                          class="h-4 w-4 text-slate-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                            stroke-width="1.6"
                          />
                          <line x1="16" y1="2" x2="16" y2="6" stroke-width="1.6" />
                          <line x1="8" y1="2" x2="8" y2="6" stroke-width="1.6" />
                          <line x1="3" y1="10" x2="21" y2="10" stroke-width="1.6" />
                        </svg>
                        <span class="text-slate-900">{{ userProfile.dateJoined }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Edit Actions -->
                  <div class="flex gap-3 mt-6 pt-4 border-t border-slate-200">
                    <button
                      type="button"
                      (click)="onSaveProfile()"
                      [disabled]="profileForm.invalid || isSaving"
                      class="primary-button flex-1 max-w-[200px]"
                    >
                      {{ isSaving ? 'Saving...' : 'Save Changes' }}
                    </button>
                    <button
                      type="button"
                      (click)="onCancelEdit()"
                      class="secondary-button min-w-[100px]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              <!-- Security & Privacy -->
              <div *ngIf="userProfile.security">
                <h4 class="text-lg font-semibold text-slate-900 mb-4">Security & Privacy</h4>
                <div class="space-y-4">
                  <!-- Security Overview -->
                  <div class="bg-slate-50 rounded-xl p-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1"
                          >Last Password Change</label
                        >
                        <div class="flex items-center gap-2">
                          <svg
                            class="h-4 w-4 text-slate-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <rect
                              x="3"
                              y="11"
                              width="18"
                              height="11"
                              rx="2"
                              ry="2"
                              stroke-width="1.6"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.6"
                              d="M7 11V7a5 5 0 0110 0v4"
                            />
                          </svg>
                          <span class="text-slate-900">{{
                            userProfile.security.lastPasswordChange
                          }}</span>
                        </div>
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1"
                          >Last Login</label
                        >
                        <div class="flex items-center gap-2">
                          <svg
                            class="h-4 w-4 text-slate-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.6"
                              d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 12h.01M12 8a2 2 0 01.35 3.97l-.35.03"
                            />
                          </svg>
                          <span class="text-slate-900">{{ userProfile.security.lastLogin }}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Two-Factor Authentication -->
                  <div class="bg-slate-50 rounded-xl p-4">
                    <div class="flex items-center justify-between">
                      <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1"
                          >Two-Factor Authentication</label
                        >
                        <p class="text-xs text-slate-600">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <div class="flex items-center gap-2">
                        <span
                          class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                          [ngClass]="{
                            'bg-emerald-50 text-emerald-600': userProfile.security.twoFactorEnabled,
                            'bg-orange-50 text-orange-600': !userProfile.security.twoFactorEnabled
                          }"
                        >
                          <span
                            class="h-1.5 w-1.5 rounded-full"
                            [ngClass]="{
                              'bg-emerald-500': userProfile.security.twoFactorEnabled,
                              'bg-orange-500': !userProfile.security.twoFactorEnabled
                            }"
                          ></span>
                          {{ userProfile.security.twoFactorEnabled ? 'Enabled' : 'Disabled' }}
                        </span>
                        <button
                          type="button"
                          class="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                          (click)="onToggle2FA()"
                        >
                          {{ userProfile.security.twoFactorEnabled ? 'Disable' : 'Enable' }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Change Password -->
                  <div class="bg-slate-50 rounded-xl p-4">
                    <div class="flex items-center justify-between mb-4">
                      <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1"
                          >Password</label
                        >
                        <p class="text-xs text-slate-600">
                          Update your password to keep your account secure
                        </p>
                      </div>
                      <button
                        type="button"
                        class="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                        (click)="togglePasswordChange()"
                      >
                        {{ showPasswordForm ? 'Cancel' : 'Change Password' }}
                      </button>
                    </div>

                    <!-- Password Change Form -->
                    <div *ngIf="showPasswordForm" class="mt-4 space-y-4">
                      <form [formGroup]="passwordForm" (ngSubmit)="onChangePassword()">
                        <div class="space-y-4">
                          <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1"
                              >Current Password</label
                            >
                            <input
                              type="password"
                              formControlName="currentPassword"
                              placeholder="Enter your current password"
                              class="form-field w-full"
                            />
                            <div
                              *ngIf="passwordForm.get('currentPassword')?.errors?.['required'] && passwordForm.get('currentPassword')?.touched"
                              class="mt-1 text-xs text-red-600"
                            >
                              Current password is required
                            </div>
                          </div>
                          <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1"
                              >New Password</label
                            >
                            <input
                              type="password"
                              formControlName="newPassword"
                              placeholder="Enter your new password"
                              class="form-field w-full"
                            />
                            <div
                              *ngIf="passwordForm.get('newPassword')?.errors?.['required'] && passwordForm.get('newPassword')?.touched"
                              class="mt-1 text-xs text-red-600"
                            >
                              New password is required
                            </div>
                            <div
                              *ngIf="passwordForm.get('newPassword')?.errors?.['minlength'] && passwordForm.get('newPassword')?.touched"
                              class="mt-1 text-xs text-red-600"
                            >
                              Password must be at least 8 characters long
                            </div>
                          </div>
                          <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1"
                              >Confirm New Password</label
                            >
                            <input
                              type="password"
                              formControlName="confirmPassword"
                              placeholder="Confirm your new password"
                              class="form-field w-full"
                            />
                            <div
                              *ngIf="passwordForm.get('confirmPassword')?.errors?.['required'] && passwordForm.get('confirmPassword')?.touched"
                              class="mt-1 text-xs text-red-600"
                            >
                              Please confirm your password
                            </div>
                            <div
                              *ngIf="passwordForm.errors?.['passwordMismatch'] && passwordForm.get('confirmPassword')?.touched"
                              class="mt-1 text-xs text-red-600"
                            >
                              Passwords do not match
                            </div>
                          </div>
                        </div>
                        <div class="flex gap-3 mt-4">
                          <button
                            type="submit"
                            [disabled]="passwordForm.invalid || isChangingPassword"
                            class="primary-button flex-1 min-w-[140px]"
                          >
                            {{ isChangingPassword ? 'Changing...' : 'Change Password' }}
                          </button>
                          <button
                            type="button"
                            (click)="togglePasswordChange()"
                            class="secondary-button min-w-[100px]"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <!-- Account Status -->
                  <div
                    class="bg-slate-50 rounded-xl p-4"
                    *ngIf="userProfile.security.loginAttempts > 0"
                  >
                    <div class="flex items-start gap-3">
                      <svg
                        class="h-5 w-5 text-orange-500 mt-0.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.6"
                          d="M12 9v2m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                        />
                      </svg>
                      <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1"
                          >Security Alert</label
                        >
                        <p class="text-sm text-slate-600">
                          There {{ userProfile.security.loginAttempts === 1 ? 'has' : 'have' }} been
                          <span class="font-semibold text-orange-600">{{
                            userProfile.security.loginAttempts
                          }}</span>
                          failed login attempt{{
                            userProfile.security.loginAttempts === 1 ? '' : 's'
                          }}
                          on your account recently.
                        </p>
                        <button
                          type="button"
                          class="mt-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                          (click)="onReviewActivity()"
                        >
                          Review Account Activity
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-slate-200 bg-slate-50">
          <div class="flex items-center justify-between">
            <p class="text-sm text-slate-600">
              {{
                isEditing
                  ? 'Make changes to update your profile information.'
                  : 'Need to update your information? Contact your administrator.'
              }}
            </p>
            <div class="flex gap-3">
              <button type="button" class="secondary-button min-w-[100px]" (click)="onClose()">
                Close
              </button>
              <button
                *ngIf="!isEditing"
                type="button"
                class="primary-button min-w-[120px]"
                (click)="onEditProfile()"
              >
                Edit Profile
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
        padding: 0.875rem 1rem;
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
        box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1), 0 1px 3px rgba(15, 118, 110, 0.1);
        transform: translateY(-1px);
      }

      .form-field:hover:not(:focus) {
        border-color: #cbd5e1;
      }

      .primary-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.95rem 2rem;
        font-size: 0.95rem;
        font-weight: 600;
        color: #ffffff;
        background-color: #0f766e;
        border: 2px solid #0f766e;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(15, 118, 110, 0.15);
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }

      .primary-button:hover:not(:disabled) {
        background-color: #115e59;
        border-color: #115e59;
        box-shadow: 0 8px 20px rgba(15, 94, 89, 0.2);
        transform: translateY(-1px);
      }

      .primary-button:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: 0 2px 8px rgba(15, 118, 110, 0.2);
      }

      .primary-button:focus {
        outline: 3px solid rgba(13, 148, 136, 0.3);
        outline-offset: 2px;
      }

      .primary-button:disabled {
        background-color: #94a3b8;
        border-color: #94a3b8;
        color: #f1f5f9;
        cursor: not-allowed;
        box-shadow: none;
        transform: none;
      }

      .secondary-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.95rem 2rem;
        font-size: 0.95rem;
        font-weight: 500;
        color: #374151;
        background-color: #ffffff;
        border: 1.5px solid #e2e8f0;
        border-radius: 8px;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      }

      .secondary-button:hover {
        border-color: #0f766e;
        color: #0f766e;
        background-color: rgba(15, 118, 110, 0.02);
        box-shadow: 0 4px 12px rgba(15, 118, 110, 0.1);
        transform: translateY(-1px);
      }

      .secondary-button:active {
        transform: translateY(0);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      }

      .secondary-button:focus {
        outline: 2px solid rgba(15, 118, 110, 0.3);
        outline-offset: 2px;
      }

      /* Image Upload Styles */
      .image-upload-overlay {
        backdrop-filter: blur(2px);
      }

      .upload-button {
        transition: all 0.2s ease-in-out;
      }

      .upload-button:hover {
        transform: scale(1.1);
      }

      .upload-button:active {
        transform: scale(0.95);
      }

      /* Profile Image Styles */
      .profile-image {
        transition: all 0.3s ease-in-out;
      }

      .profile-image:hover {
        transform: scale(1.02);
      }

      /* File input focus styles */
      input[type='file']:focus-visible + .profile-image {
        outline: 2px solid rgba(15, 118, 110, 0.5);
        outline-offset: 2px;
      }
    `,
  ],
})
export class ViewProfileModalComponent implements OnInit, OnChanges {
  @Input() isVisible = false;
  @Input() userProfile: UserProfile = {
    name: '',
    email: '',
    role: '',
    dateJoined: '',
    status: 'Active',
    initials: '',
  };

  @Output() close = new EventEmitter<void>();
  @Output() editProfile = new EventEmitter<void>();
  @Output() passwordChange = new EventEmitter<{ currentPassword: string; newPassword: string }>();
  @Output() toggle2FA = new EventEmitter<boolean>();
  @Output() reviewActivity = new EventEmitter<void>();
  @Output() profileUpdate = new EventEmitter<UserProfile>();
  @Output() profileImageUpdate = new EventEmitter<File>();

  showPasswordForm = false;
  isChangingPassword = false;
  isEditing = false;
  isSaving = false;
  isUploadingImage = false;
  passwordForm: FormGroup;
  profileForm: FormGroup;
  selectedImageFile: File | null = null;
  previewImageUrl: string | null = null;

  constructor(private formBuilder: FormBuilder) {
    this.passwordForm = this.createPasswordForm();
    this.profileForm = this.createProfileForm();
  }

  ngOnInit(): void {
    // Reset forms when modal opens
    if (this.isVisible) {
      this.resetPasswordForm();
      this.resetProfileForm();
      this.clearImagePreview();
    }
  }

  ngOnChanges(): void {
    // Update profile form when userProfile input changes
    if (this.userProfile && this.profileForm) {
      this.resetProfileForm();
    }
  }

  private createProfileForm(): FormGroup {
    // Split the full name into first and last name for editing
    const nameParts = (this.userProfile.name || '').split(' ');
    const firstName = this.userProfile.firstName || nameParts[0] || '';
    const lastName = this.userProfile.lastName || nameParts.slice(1).join(' ') || '';

    return this.formBuilder.group({
      firstName: [firstName, [Validators.required, Validators.minLength(2)]],
      lastName: [lastName, [Validators.required, Validators.minLength(1)]],
      email: [this.userProfile.email || '', [Validators.required, Validators.email]],
      phone: [this.userProfile.phone || ''],
      address: [this.userProfile.address || ''],
    });
  }

  private createPasswordForm(): FormGroup {
    return this.formBuilder.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  private passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');

    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  togglePasswordChange(): void {
    this.showPasswordForm = !this.showPasswordForm;
    if (!this.showPasswordForm) {
      this.resetPasswordForm();
    }
  }

  resetPasswordForm(): void {
    this.passwordForm.reset();
    this.isChangingPassword = false;
  }

  resetProfileForm(): void {
    // Split the full name into first and last name for editing
    const nameParts = (this.userProfile.name || '').split(' ');
    const firstName = this.userProfile.firstName || nameParts[0] || '';
    const lastName = this.userProfile.lastName || nameParts.slice(1).join(' ') || '';

    this.profileForm.patchValue({
      firstName: firstName,
      lastName: lastName,
      email: this.userProfile.email || '',
      phone: this.userProfile.phone || '',
      address: this.userProfile.address || '',
    });
  }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.resetProfileForm();
    }
  }

  onChangePassword(): void {
    if (this.passwordForm.valid && !this.isChangingPassword) {
      this.isChangingPassword = true;
      const formValue = this.passwordForm.value;

      // Emit the password change event
      this.passwordChange.emit({
        currentPassword: formValue.currentPassword,
        newPassword: formValue.newPassword,
      });

      // Simulate password change process
      setTimeout(() => {
        this.isChangingPassword = false;
        this.showPasswordForm = false;
        this.resetPasswordForm();
      }, 2000);
    }
  }

  onToggle2FA(): void {
    const currentState = this.userProfile.security?.twoFactorEnabled || false;
    this.toggle2FA.emit(!currentState);
  }

  onReviewActivity(): void {
    this.reviewActivity.emit();
  }

  onClose(): void {
    this.clearImagePreview();
    this.close.emit();
  }

  onEditProfile(): void {
    this.toggleEditMode();
  }

  onSaveProfile(): void {
    if (this.profileForm.valid && !this.isSaving) {
      this.isSaving = true;
      const formValue = this.profileForm.value;

      // Combine firstName and lastName to create full name
      const fullName = `${formValue.firstName} ${formValue.lastName}`.trim();

      const updatedProfile: UserProfile = {
        ...this.userProfile,
        name: fullName,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        phone: formValue.phone,
        address: formValue.address,
      };

      // Emit the profile update event
      this.profileUpdate.emit(updatedProfile);

      // Simulate save process
      setTimeout(() => {
        this.isSaving = false;
        this.isEditing = false;
      }, 1500);
    }
  }

  onCancelEdit(): void {
    this.isEditing = false;
    this.resetProfileForm();
    this.clearImagePreview();
  }

  onImageFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Please select an image smaller than 5MB.');
        return;
      }

      this.selectedImageFile = file;

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImageUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onUploadImage(): void {
    if (this.selectedImageFile && !this.isUploadingImage) {
      this.isUploadingImage = true;

      // Emit the image file for upload
      this.profileImageUpdate.emit(this.selectedImageFile);

      // Simulate upload process
      setTimeout(() => {
        this.isUploadingImage = false;
        // Clear the selection after successful upload
        this.clearImagePreview();
      }, 2000);
    }
  }

  clearImagePreview(): void {
    this.selectedImageFile = null;
    this.previewImageUrl = null;
    // Reset file input
    const fileInput = document.getElementById('profileImageInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}
