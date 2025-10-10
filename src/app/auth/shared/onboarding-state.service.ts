import { Injectable } from '@angular/core';

export interface BioDataState {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  phone: string;
  email: string;
  password: string;
  acceptTerms: boolean;
}

export interface SchoolInformationState {
  name: string;
  address: string;
  email: string;
  contactPhoneNumber: string;
  logoBase64: string | null;
  logoFileName: string | null;
  website: string | null;
  description: string | null;
  motto: string | null;
  mission: string | null;
  vision: string | null;
  coreValues: string | null;
  tagline: string | null;
  about: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class OnboardingStateService {
  private bioData: BioDataState | null = null;
  private schoolInformation: SchoolInformationState | null = null;

  setBioData(data: BioDataState): void {
    this.bioData = { ...data };
  }

  getBioData(): BioDataState | null {
    return this.bioData ? { ...this.bioData } : null;
  }

  setSchoolInformation(data: SchoolInformationState): void {
    this.schoolInformation = { ...data };
  }

  getSchoolInformation(): SchoolInformationState | null {
    return this.schoolInformation ? { ...this.schoolInformation } : null;
  }

  clear(): void {
    this.bioData = null;
    this.schoolInformation = null;
  }
}
