import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { CongratulationsComponent } from './auth/congratulations/congratulations.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { SchoolInformationComponent } from './auth/school-information/school-information.component';
import { ReviewSubmitComponent } from './auth/review-submit/review-submit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SessionManagementComponent } from './session-management/session-management.component';
import { ClassDetail } from './class-detail/class-detail';
import { StudentManagementComponent } from './student-management/student-management.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/school-information', component: SchoolInformationComponent },
  { path: 'auth/review', component: ReviewSubmitComponent },
  { path: 'auth/forgot-password', component: ForgotPasswordComponent },
  { path: 'auth/congratulations', component: CongratulationsComponent },
  { path: 'onboarding', component: OnboardingComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'session-management', component: SessionManagementComponent },
  { path: 'class/:id', component: ClassDetail },
  { path: 'student-management', component: StudentManagementComponent },
  { path: '**', redirectTo: 'auth/login' },
];
