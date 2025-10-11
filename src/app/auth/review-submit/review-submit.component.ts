import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  OnboardingStateService,
  BioDataState,
  SchoolInformationState,
} from '../shared/onboarding-state.service';

@Component({
  selector: 'app-review-submit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-submit.component.html',
  styleUrls: ['./review-submit.component.css'],
})
export class ReviewSubmitComponent implements OnInit {
  steps = [
    {
      title: 'Administrator Profile',
      subtitle: 'Personal information for account setup.',
    },
    {
      title: 'Institution Details',
      subtitle: 'Official information about your institution.',
    },
    {
      title: 'Review & Confirm',
      subtitle: 'Verify all information before registration.',
    },
  ];
  activeStepIndex = 2;

  bioData: BioDataState | null = null;
  schoolData: SchoolInformationState | null = null;

  constructor(private router: Router, private onboardingState: OnboardingStateService) {}

  ngOnInit(): void {
    this.bioData = this.onboardingState.getBioData();
    if (!this.bioData) {
      this.router.navigate(['/auth/register']);
      return;
    }

    this.schoolData = this.onboardingState.getSchoolInformation();
    if (!this.schoolData) {
      this.router.navigate(['/auth/school-information']);
      return;
    }
  }

  onSubmit(): void {
    if (!this.bioData || !this.schoolData) {
      return;
    }

    console.log('Submitting onboarding payload', {
      bio: this.bioData,
      school: this.schoolData,
    });

    this.onboardingState.clear();
    this.router.navigate(['/auth/congratulations']);
  }

  onBack(): void {
    this.router.navigate(['/auth/school-information']);
  }

  onEditBio(): void {
    this.router.navigate(['/auth/register']);
  }

  onEditSchool(): void {
    this.router.navigate(['/auth/school-information']);
  }
}
