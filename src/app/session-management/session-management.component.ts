import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface ClassData {
  id: string;
  className: string;
  noOfStudents: number;
  formTeacher: string;
  capacity: number;
  status: 'Active' | 'Inactive';
  isCompulsory: boolean;
}

interface SubjectData {
  id: string;
  title: string;
  schoolSpecific: boolean;
  status: 'Active' | 'Inactive';
  createdDate: string;
  updatedDate: string;
}

interface ClassSubject {
  id: string;
  classId: string;
  subjectId: string;
  assignedDate: string;
  status: 'Active' | 'Inactive';
}

interface ClassWithSubjects extends ClassData {
  assignedSubjects: SubjectData[];
}

interface SessionData {
  currentSession: string;
  sessionStarted: string;
  sessionEnded: string;
  currentTerm: string;
  termStarted: string;
  termEnded: string;
  noOfClasses: number;
  resultDate: string;
}

interface SessionHistoryItem {
  session: string;
  terms: string;
  status: 'Ongoing' | 'Done';
  start: string;
  end: string;
  action: string;
}

interface SessionForm {
  sessionName: string;
  startDate: string;
  endDate: string;
  numberOfTerms: number;
  currentTerm: string;
  termStartDate: string;
  termEndDate: string;
}

interface ClassForm {
  className: string;
  capacity: number;
  formTeacher: string;
  status: 'Active' | 'Inactive';
  isCompulsory: boolean;
}

interface SubjectForm {
  title: string;
  schoolSpecific: boolean;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-session-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './session-management.component.html',
  styleUrls: ['./session-management.component.css'],
})
export class SessionManagementComponent {
  // Navigation state
  isSidebarCollapsed = false;
  isMobileSidebarOpen = false;
  isUserMenuOpen = false;

  // Tab state
  activeTab: 'session' | 'class' | 'subject' = 'session';

  // Modal state
  isSessionModalOpen = false;
  isClassModalOpen = false;
  isSubjectModalOpen = false;
  isAssignSubjectsModalOpen = false;
  isEditMode = false;
  currentEditingSession: SessionHistoryItem | null = null;
  currentEditingClass: ClassData | null = null;
  currentEditingSubject: SubjectData | null = null;
  currentClassForSubjectAssignment: ClassData | null = null;

  // Session form data
  sessionForm: SessionForm = {
    sessionName: '',
    startDate: '',
    endDate: '',
    numberOfTerms: 3,
    currentTerm: '',
    termStartDate: '',
    termEndDate: '',
  };

  // Class form data
  classForm: ClassForm = {
    className: '',
    capacity: 25,
    formTeacher: '',
    status: 'Active',
    isCompulsory: true,
  };

  // Subject form data
  subjectForm: SubjectForm = {
    title: '',
    schoolSpecific: true,
    status: 'Active',
  };

  // Available teachers
  readonly availableTeachers = [
    'Mrs. Eneh Mercy',
    'Mr. John Okeke',
    'Mrs. Grace Adaora',
    'Mr. Samuel Okafor',
    'Mrs. Joy Nnamdi',
    'Mr. Peter Eze',
    'Mrs. Mary Okoye',
    'Mr. Daniel Okoro',
    'Mrs. Ruth Chukwu',
    'Mr. Joseph Igwe',
  ];

  // Session data
  readonly sessionData: SessionData = {
    currentSession: '2024/2025',
    sessionStarted: '12/09/2024',
    sessionEnded: '21/07/2024',
    currentTerm: '2nd Term',
    termStarted: '11/04/2024',
    termEnded: '21/07/2024',
    noOfClasses: 30,
    resultDate: '21/07/2024',
  };

  // Session history data
  readonly sessionHistory: SessionHistoryItem[] = [
    {
      session: '2024/2025',
      terms: '2024/2025',
      status: 'Ongoing',
      start: '12/09/2024',
      end: '12/09/2024',
      action: 'Session Overview',
    },
    {
      session: '2024/2025',
      terms: '2024/2025',
      status: 'Done',
      start: '12/09/2024',
      end: '12/09/2024',
      action: 'Session Overview',
    },
    {
      session: '2024/2025',
      terms: '2024/2025',
      status: 'Done',
      start: '12/09/2024',
      end: '12/09/2024',
      action: 'Session Overview',
    },
    {
      session: '2024/2025',
      terms: '2024/2025',
      status: 'Done',
      start: '12/09/2024',
      end: '12/09/2024',
      action: 'Session Overview',
    },
    {
      session: '2024/2025',
      terms: '2024/2025',
      status: 'Done',
      start: '12/09/2024',
      end: '12/09/2024',
      action: 'Session Overview',
    },
    {
      session: '2024/2025',
      terms: '2024/2025',
      status: 'Done',
      start: '12/09/2024',
      end: '12/09/2024',
      action: 'Session Overview',
    },
  ];

  // Class management data
  readonly classList: ClassData[] = [
    {
      id: '1',
      className: 'Jss1 A',
      noOfStudents: 12,
      formTeacher: 'Mrs. Eneh Mercy',
      capacity: 25,
      status: 'Active',
      isCompulsory: true,
    },
    {
      id: '2',
      className: 'Jss1 B',
      noOfStudents: 12,
      formTeacher: 'Mrs. Eneh Mercy',
      capacity: 25,
      status: 'Active',
      isCompulsory: true,
    },
    {
      id: '3',
      className: 'Jss1 A',
      noOfStudents: 12,
      formTeacher: 'Mrs. Eneh Mercy',
      capacity: 25,
      status: 'Active',
      isCompulsory: false,
    },
    {
      id: '4',
      className: 'Jss1 B',
      noOfStudents: 12,
      formTeacher: 'Mrs. Eneh Mercy',
      capacity: 25,
      status: 'Active',
      isCompulsory: true,
    },
    {
      id: '5',
      className: 'Jss1 A',
      noOfStudents: 12,
      formTeacher: 'Mrs. Eneh Mercy',
      capacity: 25,
      status: 'Active',
      isCompulsory: false,
    },
    {
      id: '6',
      className: 'Jss1 B',
      noOfStudents: 12,
      formTeacher: 'Mrs. Eneh Mercy',
      capacity: 25,
      status: 'Active',
      isCompulsory: true,
    },
  ];

  // Subject management data
  readonly subjectList: SubjectData[] = [
    {
      id: '1',
      title: 'Mathematics',
      schoolSpecific: true,
      status: 'Active',
      createdDate: '2024-09-15',
      updatedDate: '2024-09-15',
    },
    {
      id: '2',
      title: 'English Language',
      schoolSpecific: false,
      status: 'Active',
      createdDate: '2024-09-15',
      updatedDate: '2024-09-15',
    },
    {
      id: '3',
      title: 'Biology',
      schoolSpecific: true,
      status: 'Active',
      createdDate: '2024-09-16',
      updatedDate: '2024-09-16',
    },
    {
      id: '4',
      title: 'Chemistry',
      schoolSpecific: true,
      status: 'Active',
      createdDate: '2024-09-16',
      updatedDate: '2024-09-16',
    },
    {
      id: '5',
      title: 'Physics',
      schoolSpecific: false,
      status: 'Active',
      createdDate: '2024-09-17',
      updatedDate: '2024-09-17',
    },
  ];

  // Class-Subject assignment data
  readonly classSubjectAssignments: ClassSubject[] = [
    {
      id: '1',
      classId: '1',
      subjectId: '1', // Mathematics
      assignedDate: '2024-09-15',
      status: 'Active',
    },
    {
      id: '2',
      classId: '1',
      subjectId: '2', // English Language
      assignedDate: '2024-09-15',
      status: 'Active',
    },
    {
      id: '3',
      classId: '2',
      subjectId: '1', // Mathematics
      assignedDate: '2024-09-16',
      status: 'Active',
    },
    {
      id: '4',
      classId: '2',
      subjectId: '3', // Biology
      assignedDate: '2024-09-16',
      status: 'Active',
    },
  ];

  // Navigation items
  readonly navItems = [
    { label: 'Dashboard', icon: 'dashboard', isActive: false },
    { label: 'School management', icon: 'management', isActive: true },
    { label: 'Payments', icon: 'payments', isActive: false },
    { label: 'Staffs', icon: 'staffs', isActive: false },
    { label: 'Students', icon: 'students', isActive: false },
    { label: 'Settings', icon: 'settings', isActive: false },
    { label: 'Transactions', icon: 'transactions', isActive: false },
  ];

  // Management tabs
  managementTabs = [
    { label: 'Session Management', isActive: true, key: 'session' as const },
    { label: 'Class Management', isActive: false, key: 'class' as const },
    { label: 'Subject Management', isActive: false, key: 'subject' as const },
  ];

  constructor(private router: Router) {}

  // Computed properties for class management
  get activeClassCount(): number {
    return this.classList.filter((c) => c.status === 'Active').length;
  }

  get totalStudentsCount(): number {
    return this.classList.reduce((sum, c) => sum + c.noOfStudents, 0);
  }

  get uniqueFormTeachersCount(): number {
    const uniqueTeachers = new Set(this.classList.map((c) => c.formTeacher));
    return uniqueTeachers.size;
  }

  // Computed properties for subject management
  get activeSubjectCount(): number {
    return this.subjectList.filter((s) => s.status === 'Active').length;
  }

  get schoolSpecificSubjectCount(): number {
    return this.subjectList.filter((s) => s.schoolSpecific).length;
  }

  get generalSubjectCount(): number {
    return this.subjectList.filter((s) => !s.schoolSpecific).length;
  }

  // Navigation methods
  toggleSidebarCollapse(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleMobileSidebar(): void {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }

  closeMobileSidebar(): void {
    this.isMobileSidebarOpen = false;
  }

  toggleUserMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeUserMenu(): void {
    this.isUserMenuOpen = false;
  }

  // Navigation handlers
  navigateToItem(item: any): void {
    switch (item.label) {
      case 'Dashboard':
        this.router.navigate(['/dashboard']);
        break;
      case 'Students':
        this.router.navigate(['/student-management']);
        break;
      default:
        console.log('Navigate to:', item.label);
    }
  }

  // Tab switching
  switchTab(tabKey: 'session' | 'class' | 'subject'): void {
    this.activeTab = tabKey;
    this.managementTabs.forEach((tab) => {
      tab.isActive = tab.key === tabKey;
    });
  }

  createSession(): void {
    this.isEditMode = false;
    this.currentEditingSession = null;
    this.resetSessionForm();
    this.isSessionModalOpen = true;
  }

  createClass(): void {
    this.isEditMode = false;
    this.currentEditingClass = null;
    this.resetClassForm();
    this.isClassModalOpen = true;
  }

  editSession(session: SessionHistoryItem): void {
    this.isEditMode = true;
    this.currentEditingSession = session;
    this.populateSessionForm(session);
    this.isSessionModalOpen = true;
  }

  closeSessionModal(): void {
    this.isSessionModalOpen = false;
    this.resetSessionForm();
    this.currentEditingSession = null;
    this.isEditMode = false;
  }

  saveSession(): void {
    if (this.isEditMode && this.currentEditingSession) {
      // Update existing session logic
      console.log('Updating session:', this.sessionForm);
    } else {
      // Create new session logic
      console.log('Creating new session:', this.sessionForm);
    }
    this.closeSessionModal();
  }

  private resetSessionForm(): void {
    this.sessionForm = {
      sessionName: '',
      startDate: '',
      endDate: '',
      numberOfTerms: 3,
      currentTerm: '',
      termStartDate: '',
      termEndDate: '',
    };
  }

  private populateSessionForm(session: SessionHistoryItem): void {
    this.sessionForm = {
      sessionName: session.session,
      startDate: session.start,
      endDate: session.end,
      numberOfTerms: 3,
      currentTerm: '',
      termStartDate: '',
      termEndDate: '',
    };
  }

  closeClassModal(): void {
    this.isClassModalOpen = false;
    this.resetClassForm();
    this.currentEditingClass = null;
    this.isEditMode = false;
  }

  saveClass(): void {
    if (this.isEditMode && this.currentEditingClass) {
      // Update existing class logic
      console.log('Updating class:', this.classForm);
      // Find and update the class in the classList array
      const index = this.classList.findIndex((c) => c.id === this.currentEditingClass!.id);
      if (index !== -1) {
        const updatedClass = {
          ...this.currentEditingClass,
          ...this.classForm,
        };
        // In a real app, you would update this via a service
        console.log('Class updated:', updatedClass);
      }
    } else {
      // Create new class logic
      const newClass: ClassData = {
        id: (this.classList.length + 1).toString(),
        ...this.classForm,
        noOfStudents: 0, // Start with 0 students
      };
      console.log('Creating new class:', newClass);
      // In a real app, you would add this via a service
    }
    this.closeClassModal();
  }

  private resetClassForm(): void {
    this.classForm = {
      className: '',
      capacity: 25,
      formTeacher: '',
      status: 'Active',
      isCompulsory: true,
    };
  }

  private populateClassForm(classItem: ClassData): void {
    this.classForm = {
      className: classItem.className,
      capacity: classItem.capacity,
      formTeacher: classItem.formTeacher,
      status: classItem.status,
      isCompulsory: classItem.isCompulsory,
    };
  }

  viewClass(classItem: ClassData): void {
    // Navigate to class detail page with class ID
    this.router.navigate(['/class', classItem.id]);
  }

  // Subject Management Methods
  openCreateSubjectModal(): void {
    this.isEditMode = false;
    this.currentEditingSubject = null;
    this.resetSubjectForm();
    this.isSubjectModalOpen = true;
  }

  editSubject(subject: SubjectData): void {
    this.isEditMode = true;
    this.currentEditingSubject = subject;
    this.populateSubjectForm(subject);
    this.isSubjectModalOpen = true;
  }

  closeSubjectModal(): void {
    this.isSubjectModalOpen = false;
    this.isEditMode = false;
    this.currentEditingSubject = null;
    this.resetSubjectForm();
  }

  submitSubjectForm(): void {
    if (this.isEditMode && this.currentEditingSubject) {
      // Update existing subject
      const updatedSubject: SubjectData = {
        ...this.currentEditingSubject,
        title: this.subjectForm.title,
        schoolSpecific: this.subjectForm.schoolSpecific,
        status: this.subjectForm.status,
        updatedDate: new Date().toISOString().split('T')[0],
      };
      console.log('Updating subject:', updatedSubject);
      // In a real app, you would update this via a service
    } else {
      // Create new subject
      const newSubject: SubjectData = {
        id: (this.subjectList.length + 1).toString(),
        title: this.subjectForm.title,
        schoolSpecific: this.subjectForm.schoolSpecific,
        status: this.subjectForm.status,
        createdDate: new Date().toISOString().split('T')[0],
        updatedDate: new Date().toISOString().split('T')[0],
      };
      console.log('Creating new subject:', newSubject);
      // In a real app, you would add this via a service
    }
    this.closeSubjectModal();
  }

  deleteSubject(subject: SubjectData): void {
    if (confirm(`Are you sure you want to delete the subject "${subject.title}"?`)) {
      console.log('Deleting subject:', subject);
      // In a real app, you would delete this via a service
      // For now, just log the action
    }
  }

  private resetSubjectForm(): void {
    this.subjectForm = {
      title: '',
      schoolSpecific: true,
      status: 'Active',
    };
  }

  private populateSubjectForm(subject: SubjectData): void {
    this.subjectForm = {
      title: subject.title,
      schoolSpecific: subject.schoolSpecific,
      status: subject.status,
    };
  }

  // Assignment methods
  openAssignSubjectsModal(classData: ClassData): void {
    this.currentClassForSubjectAssignment = classData;
    this.isAssignSubjectsModalOpen = true;
  }

  closeAssignSubjectsModal(): void {
    this.isAssignSubjectsModalOpen = false;
    this.currentClassForSubjectAssignment = null;
  }

  assignSubjectToClass(subjectId: string): void {
    if (!this.currentClassForSubjectAssignment) return;

    const existingAssignment = this.classSubjectAssignments.find(
      (assignment) =>
        assignment.classId === this.currentClassForSubjectAssignment!.id &&
        assignment.subjectId === subjectId
    );

    if (!existingAssignment) {
      const newAssignment: ClassSubject = {
        id: this.generateId(),
        classId: this.currentClassForSubjectAssignment.id,
        subjectId: subjectId,
        assignedDate: new Date().toISOString(),
        status: 'Active',
      };

      this.classSubjectAssignments.push(newAssignment);
    }
  }

  removeSubjectFromClass(classId: string, subjectId: string): void {
    const assignmentIndex = this.classSubjectAssignments.findIndex(
      (assignment) => assignment.classId === classId && assignment.subjectId === subjectId
    );

    if (assignmentIndex > -1) {
      this.classSubjectAssignments.splice(assignmentIndex, 1);
    }
  }

  getAssignedSubjects(classId: string): SubjectData[] {
    const assignedSubjectIds = this.classSubjectAssignments
      .filter((assignment) => assignment.classId === classId && assignment.status === 'Active')
      .map((assignment) => assignment.subjectId);

    return this.subjectList.filter((subject) => assignedSubjectIds.includes(subject.id));
  }

  getAvailableSubjects(classId: string): SubjectData[] {
    const assignedSubjectIds = this.classSubjectAssignments
      .filter((assignment) => assignment.classId === classId && assignment.status === 'Active')
      .map((assignment) => assignment.subjectId);

    return this.subjectList.filter((subject) => !assignedSubjectIds.includes(subject.id));
  }

  isSubjectAssigned(classId: string, subjectId: string): boolean {
    return this.classSubjectAssignments.some(
      (assignment) =>
        assignment.classId === classId &&
        assignment.subjectId === subjectId &&
        assignment.status === 'Active'
    );
  }

  private generateId(): string {
    return 'CS' + Date.now().toString();
  }

  getClassName(classId: string): string {
    const classData = this.classList.find((c) => c.id === classId);
    return classData ? classData.className : 'Unknown Class';
  }

  trackByIndex = (_: number, item: unknown) => item;
}
