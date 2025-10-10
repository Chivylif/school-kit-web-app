import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { CongratulationsComponent } from './auth/congratulations/congratulations.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { SchoolInformationComponent } from './auth/school-information/school-information.component';
import { ReviewSubmitComponent } from './auth/review-submit/review-submit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/school-information', component: SchoolInformationComponent },
  { path: 'auth/review', component: ReviewSubmitComponent },
  { path: 'auth/forgot-password', component: ForgotPasswordComponent },
  { path: 'auth/congratulations', component: CongratulationsComponent },
  { path: 'onboarding', component: OnboardingComponent },
  { path: '**', redirectTo: 'auth/login' },
];
