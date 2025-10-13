import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface Student {
  id: string;
  name: string;
  email: string;
  gender: string;
  enrollmentDate: string;
  status: string;
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

interface ClassOverview {
  className: string;
  currentSession: string;
  currentTerm: string;
  sessionStarted: string;
  termStarted: string;
  numberOfStudents: number;
  numberOfSubjects: number;
  capacity: number;
  formTeacher: string;
}

interface ClassForm {
  className: string;
  capacity: number;
  formTeacher: string;
  status: 'Active' | 'Inactive';
  isCompulsory: boolean;
}

interface Teacher {
  id: string;
  name: string;
}

@Component({
  selector: 'app-class-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './class-detail.html',
  styleUrl: './class-detail.css',
})
export class ClassDetail implements OnInit {
  classId: string = '';
  classOverview: ClassOverview = {
    className: 'JSS 1A',
    currentSession: '2024/2025',
    currentTerm: '2nd Term',
    sessionStarted: '12/09/2024',
    termStarted: '11/04/2024',
    numberOfStudents: 30,
    numberOfSubjects: 12,
    capacity: 35,
    formTeacher: 'Mrs. Sarah Johnson',
  };

  students: Student[] = [
    {
      id: '703701',
      name: 'Eneh Mercy',
      email: 'michelle.rivera@example.com',
      gender: 'Female',
      enrollmentDate: '2024-09-15',
      status: 'Active',
    },
    {
      id: '703702',
      name: 'John Smith',
      email: 'john.smith@example.com',
      gender: 'Male',
      enrollmentDate: '2024-09-15',
      status: 'Active',
    },
    {
      id: '703703',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      gender: 'Female',
      enrollmentDate: '2024-09-16',
      status: 'Active',
    },
    {
      id: '703704',
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      gender: 'Male',
      enrollmentDate: '2024-09-16',
      status: 'Active',
    },
    {
      id: '703705',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      gender: 'Female',
      enrollmentDate: '2024-09-17',
      status: 'Active',
    },
    {
      id: '703706',
      name: 'David Lee',
      email: 'david.lee@example.com',
      gender: 'Male',
      enrollmentDate: '2024-09-17',
      status: 'Active',
    },
    {
      id: '703707',
      name: 'Emma Davis',
      email: 'emma.davis@example.com',
      gender: 'Female',
      enrollmentDate: '2024-09-18',
      status: 'Active',
    },
    {
      id: '703708',
      name: 'James Taylor',
      email: 'james.taylor@example.com',
      gender: 'Male',
      enrollmentDate: '2024-09-18',
      status: 'Active',
    },
  ];

  filteredStudents: Student[] = [...this.students];
  searchQuery: string = '';
  selectedFilter: string = 'All';

  // Sidebar properties
  isSidebarCollapsed = false;
  isMobileSidebarOpen = false;

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

  // Modal properties
  isClassModalOpen = false;
  isEditMode = false;
  classForm: ClassForm = {
    className: '',
    capacity: 0,
    formTeacher: '',
    status: 'Active',
    isCompulsory: false,
  };

  teachers: Teacher[] = [
    { id: '1', name: 'Mrs. Sarah Johnson' },
    { id: '2', name: 'Mr. David Smith' },
    { id: '3', name: 'Ms. Emily Brown' },
    { id: '4', name: 'Mr. Michael Wilson' },
    { id: '5', name: 'Mrs. Jennifer Davis' },
  ];

  // Subject data
  readonly subjects: SubjectData[] = [
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
    {
      id: '6',
      title: 'Geography',
      schoolSpecific: true,
      status: 'Active',
      createdDate: '2024-09-17',
      updatedDate: '2024-09-17',
    },
    {
      id: '7',
      title: 'History',
      schoolSpecific: false,
      status: 'Active',
      createdDate: '2024-09-18',
      updatedDate: '2024-09-18',
    },
    {
      id: '8',
      title: 'Civic Education',
      schoolSpecific: true,
      status: 'Active',
      createdDate: '2024-09-18',
      updatedDate: '2024-09-18',
    },
    {
      id: '9',
      title: 'Computer Science',
      schoolSpecific: true,
      status: 'Active',
      createdDate: '2024-09-19',
      updatedDate: '2024-09-19',
    },
    {
      id: '10',
      title: 'Fine Arts',
      schoolSpecific: true,
      status: 'Active',
      createdDate: '2024-09-19',
      updatedDate: '2024-09-19',
    },
    {
      id: '11',
      title: 'Physical Education',
      schoolSpecific: false,
      status: 'Active',
      createdDate: '2024-09-20',
      updatedDate: '2024-09-20',
    },
    {
      id: '12',
      title: 'Music',
      schoolSpecific: true,
      status: 'Active',
      createdDate: '2024-09-20',
      updatedDate: '2024-09-20',
    },
  ];

  // Class-Subject assignments (for JSS 1A - classId would be '1')
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
      classId: '1',
      subjectId: '3', // Biology
      assignedDate: '2024-09-16',
      status: 'Active',
    },
    {
      id: '4',
      classId: '1',
      subjectId: '4', // Chemistry
      assignedDate: '2024-09-16',
      status: 'Active',
    },
    {
      id: '5',
      classId: '1',
      subjectId: '5', // Physics
      assignedDate: '2024-09-17',
      status: 'Active',
    },
    {
      id: '6',
      classId: '1',
      subjectId: '6', // Geography
      assignedDate: '2024-09-17',
      status: 'Active',
    },
    {
      id: '7',
      classId: '1',
      subjectId: '7', // History
      assignedDate: '2024-09-18',
      status: 'Active',
    },
    {
      id: '8',
      classId: '1',
      subjectId: '8', // Civic Education
      assignedDate: '2024-09-18',
      status: 'Active',
    },
    {
      id: '9',
      classId: '1',
      subjectId: '9', // Computer Science
      assignedDate: '2024-09-19',
      status: 'Active',
    },
    {
      id: '10',
      classId: '1',
      subjectId: '10', // Fine Arts
      assignedDate: '2024-09-19',
      status: 'Active',
    },
    {
      id: '11',
      classId: '1',
      subjectId: '11', // Physical Education
      assignedDate: '2024-09-20',
      status: 'Active',
    },
    {
      id: '12',
      classId: '1',
      subjectId: '12', // Music
      assignedDate: '2024-09-20',
      status: 'Active',
    },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.classId = params['id'];
      // In real app, you would fetch class data based on ID
      this.loadClassData();
    });
  }

  loadClassData(): void {
    // In real app, this would make an API call
    // For now, we'll use mock data
    console.log('Loading data for class:', this.classId);
  }

  searchStudents(): void {
    this.filteredStudents = this.students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        student.id.includes(this.searchQuery);

      const matchesFilter = this.selectedFilter === 'All' || student.gender === this.selectedFilter;

      return matchesSearch && matchesFilter;
    });
  }

  viewProfile(student: Student): void {
    console.log('Viewing profile for:', student.name);
    // Navigate to student profile or open modal
  }

  editClass(): void {
    this.isEditMode = true;
    this.populateClassForm();
    this.isClassModalOpen = true;
  }

  addStudent(): void {
    console.log('Add student to class:', this.classOverview.className);
    // Navigate to add student or open modal
  }

  // Modal methods
  closeClassModal(): void {
    this.isClassModalOpen = false;
    this.isEditMode = false;
    this.resetClassForm();
  }

  onClassSubmit(): void {
    if (this.isEditMode) {
      console.log('Updating class:', this.classForm);
      // Update the class overview with form data
      this.classOverview.className = this.classForm.className;
      this.classOverview.capacity = this.classForm.capacity;
      this.classOverview.formTeacher = this.classForm.formTeacher;
    }
    this.closeClassModal();
  }

  private resetClassForm(): void {
    this.classForm = {
      className: '',
      capacity: 0,
      formTeacher: '',
      status: 'Active',
      isCompulsory: false,
    };
  }

  private populateClassForm(): void {
    this.classForm = {
      className: this.classOverview.className,
      capacity: this.classOverview.capacity,
      formTeacher: this.classOverview.formTeacher,
      status: 'Active',
      isCompulsory: false,
    };
  }

  // Sidebar methods
  toggleSidebarCollapse(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleMobileSidebar(): void {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }

  closeMobileSidebar(): void {
    this.isMobileSidebarOpen = false;
  }

  navigateToItem(item: any): void {
    // Reset all items to inactive
    this.navItems.forEach((navItem) => (navItem.isActive = false));
    // Set clicked item as active
    item.isActive = true;

    // Navigate based on the item
    switch (item.label) {
      case 'Dashboard':
        this.router.navigate(['/dashboard']);
        break;
      case 'School management':
        this.router.navigate(['/session-management']);
        break;
      // Add other navigation cases as needed
      default:
        console.log('Navigate to:', item.label);
    }
  }

  goBack(): void {
    this.router.navigate(['/session-management']);
  }

  getStudentInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }

  getAssignedSubjects(): SubjectData[] {
    const assignedSubjectIds = this.classSubjectAssignments
      .filter((assignment) => assignment.classId === '1' && assignment.status === 'Active')
      .map((assignment) => assignment.subjectId);

    return this.subjects.filter((subject) => assignedSubjectIds.includes(subject.id));
  }

  trackByIndex(index: number): number {
    return index;
  }
}
