import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingStateService, SchoolInformationState } from '../shared/onboarding-state.service';

type NullableString = string | null;

@Component({
  selector: 'app-school-information',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './school-information.component.html',
  styleUrls: ['./school-information.component.css'],
})
export class SchoolInformationComponent implements OnInit {
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
  activeStepIndex = 1;

  school: SchoolInformationState = {
    name: '',
    address: '',
    email: '',
    contactPhoneNumber: '',
    logoBase64: null,
    logoFileName: null,
    website: null,
    description: null,
    motto: null,
    mission: null,
    vision: null,
    coreValues: null,
    tagline: null,
    about: null,
  };

  constructor(private router: Router, private onboardingState: OnboardingStateService) {}

  ngOnInit(): void {
    const bio = this.onboardingState.getBioData();
    if (!bio) {
      this.router.navigate(['/auth/register']);
      return;
    }

    const savedSchool = this.onboardingState.getSchoolInformation();
    if (savedSchool) {
      this.school = { ...savedSchool };
    }
  }

  onSubmit() {
    if (
      !this.school.name ||
      !this.school.address ||
      !this.school.email ||
      !this.school.contactPhoneNumber
    ) {
      return;
    }

    this.onboardingState.setSchoolInformation(this.school);
    this.router.navigate(['/auth/review']);
  }

  onBack() {
    this.router.navigate(['/auth/register']);
  }

  async onLogoSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) {
      return;
    }

    const file = target.files[0];
    this.school.logoFileName = file.name;

    try {
      const base64 = await this.toBase64(file);
      this.school.logoBase64 = base64;
    } catch (error) {
      console.error('Error converting logo to base64:', error);
      this.school.logoBase64 = null;
      this.school.logoFileName = null;
    }
  }

  clearLogo() {
    this.school.logoBase64 = null;
    this.school.logoFileName = null;
  }

  private toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  capitalizeAndTrim(field: keyof Pick<SchoolInformationState, 'name' | 'address'>) {
    const value = this.school[field];
    if (!value) {
      return;
    }

    this.school[field] = this.capitalizeWords(value);
  }

  private capitalizeWords(value: string): string {
    return value
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
