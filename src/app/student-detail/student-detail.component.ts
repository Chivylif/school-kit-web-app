import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarComponent, NavItem } from '../shared/components/sidebar/sidebar.component';

interface StudentData {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: 'Male' | 'Female';
  email: string;
  address: string;
  state: string;
  country: string;
  regNo: string;
  dateOfBirth: string;
  classId: string;
  status: 'Active' | 'Inactive';
  enrollmentDate: string;
}

interface ParentData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  relationship: string;
  address: string;
  occupation: string;
  status: 'Active' | 'Inactive';
  studentId: string;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  description: string;
  dueDate: string;
  status: 'Pending' | 'Submitted' | 'Late' | 'Graded';
  score?: number;
  maxScore: number;
  submissionDate?: string;
}

interface Fee {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  paidDate?: string;
  term: string;
  session: string;
}

interface ClassInfo {
  id: string;
  className: string;
  formTeacher: string;
  subjects: string[];
}

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.css',
})
export class StudentDetailComponent implements OnInit {
  studentId: string = '';
  student: StudentData | null = null;
  parents: ParentData[] = [];
  assignments: Assignment[] = [];
  fees: Fee[] = [];
  classInfo: ClassInfo | null = null;

  activeTab: 'overview' | 'assignments' | 'fees' | 'parents' = 'overview';

  // Sidebar properties
  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', isActive: false },
    { label: 'School management', icon: 'management', isActive: false },
    { label: 'Payments', icon: 'payments', isActive: false },
    { label: 'Staffs', icon: 'staffs', isActive: false },
    { label: 'Students', icon: 'students', isActive: true },
    { label: 'Settings', icon: 'settings', isActive: false },
    { label: 'Transactions', icon: 'transactions', isActive: false },
  ];

  isSidebarCollapsed = false;
  isMobileSidebarOpen = false;
  isUserMenuOpen = false;

  // Mock data - replace with actual service calls
  studentList: StudentData[] = [
    {
      id: 'STU001',
      firstName: 'John',
      middleName: 'Michael',
      lastName: 'Doe',
      gender: 'Male',
      email: 'john.doe@email.com',
      address: '123 Main Street, Victoria Island',
      state: 'Lagos',
      country: 'Nigeria',
      regNo: 'REG2024001',
      dateOfBirth: '2010-05-15',
      classId: 'class1',
      status: 'Active',
      enrollmentDate: '2024-09-01',
    },
    {
      id: 'STU002',
      firstName: 'Sarah',
      middleName: 'Grace',
      lastName: 'Johnson',
      gender: 'Female',
      email: 'sarah.johnson@email.com',
      address: '456 Oak Avenue, Ikoyi',
      state: 'Lagos',
      country: 'Nigeria',
      regNo: 'REG2024002',
      dateOfBirth: '2010-08-22',
      classId: 'class1',
      status: 'Active',
      enrollmentDate: '2024-09-01',
    },
    {
      id: 'STU003',
      firstName: 'David',
      middleName: 'Emmanuel',
      lastName: 'Wilson',
      gender: 'Male',
      email: 'david.wilson@email.com',
      address: '789 Pine Road, Lekki',
      state: 'Lagos',
      country: 'Nigeria',
      regNo: 'REG2024003',
      dateOfBirth: '2010-03-10',
      classId: 'class2',
      status: 'Active',
      enrollmentDate: '2024-09-01',
    },
    {
      id: 'STU004',
      firstName: 'Mercy',
      middleName: 'Chioma',
      lastName: 'Okeke',
      gender: 'Female',
      email: 'mercy.okeke@email.com',
      address: '321 Cedar Street, Surulere',
      state: 'Lagos',
      country: 'Nigeria',
      regNo: 'REG2024004',
      dateOfBirth: '2010-12-05',
      classId: 'class2',
      status: 'Active',
      enrollmentDate: '2024-09-01',
    },
    {
      id: 'STU005',
      firstName: 'Ahmed',
      middleName: 'Tunde',
      lastName: 'Ibrahim',
      gender: 'Male',
      email: 'ahmed.ibrahim@email.com',
      address: '654 Elm Street, Yaba',
      state: 'Lagos',
      country: 'Nigeria',
      regNo: 'REG2024005',
      dateOfBirth: '2010-07-18',
      classId: 'class3',
      status: 'Active',
      enrollmentDate: '2024-09-01',
    },
    {
      id: 'STU006',
      firstName: 'Blessing',
      middleName: 'Ada',
      lastName: 'Okafor',
      gender: 'Female',
      email: 'blessing.okafor@email.com',
      address: '987 Birch Avenue, Ikeja',
      state: 'Lagos',
      country: 'Nigeria',
      regNo: 'REG2024006',
      dateOfBirth: '2010-09-30',
      classId: 'class3',
      status: 'Active',
      enrollmentDate: '2024-09-01',
    },
    {
      id: 'STU007',
      firstName: 'Victor',
      middleName: 'Chinedu',
      lastName: 'Eze',
      gender: 'Male',
      email: 'victor.eze@email.com',
      address: '246 Maple Street, Gbagada',
      state: 'Lagos',
      country: 'Nigeria',
      regNo: 'REG2024007',
      dateOfBirth: '2010-11-12',
      classId: 'class4',
      status: 'Active',
      enrollmentDate: '2024-09-01',
    },
    {
      id: 'STU008',
      firstName: 'Faith',
      middleName: 'Ngozi',
      lastName: 'Uche',
      gender: 'Female',
      email: 'faith.uche@email.com',
      address: '135 Willow Drive, Ojodu',
      state: 'Lagos',
      country: 'Nigeria',
      regNo: 'REG2024008',
      dateOfBirth: '2010-04-25',
      classId: 'class4',
      status: 'Active',
      enrollmentDate: '2024-09-01',
    },
  ];

  parentList: ParentData[] = [
    {
      id: 'PAR001',
      firstName: 'Robert',
      lastName: 'Doe',
      email: 'robert.doe@email.com',
      phone: '+234-801-234-5678',
      relationship: 'Father',
      address: '123 Main Street, Victoria Island',
      occupation: 'Software Engineer',
      status: 'Active',
      studentId: 'STU001',
    },
    {
      id: 'PAR002',
      firstName: 'Mary',
      lastName: 'Doe',
      email: 'mary.doe@email.com',
      phone: '+234-802-345-6789',
      relationship: 'Mother',
      address: '123 Main Street, Victoria Island',
      occupation: 'Teacher',
      status: 'Active',
      studentId: 'STU001',
    },
    {
      id: 'PAR003',
      firstName: 'James',
      lastName: 'Johnson',
      email: 'james.johnson@email.com',
      phone: '+234-803-456-7890',
      relationship: 'Father',
      address: '456 Oak Avenue, Ikoyi',
      occupation: 'Doctor',
      status: 'Active',
      studentId: 'STU002',
    },
    {
      id: 'PAR004',
      firstName: 'Peter',
      lastName: 'Wilson',
      email: 'peter.wilson@email.com',
      phone: '+234-804-567-8901',
      relationship: 'Father',
      address: '789 Pine Road, Lekki',
      occupation: 'Lawyer',
      status: 'Active',
      studentId: 'STU003',
    },
    {
      id: 'PAR005',
      firstName: 'Grace',
      lastName: 'Okeke',
      email: 'grace.okeke@email.com',
      phone: '+234-805-678-9012',
      relationship: 'Mother',
      address: '321 Cedar Street, Surulere',
      occupation: 'Nurse',
      status: 'Active',
      studentId: 'STU004',
    },
    {
      id: 'PAR006',
      firstName: 'Mohammed',
      lastName: 'Ibrahim',
      email: 'mohammed.ibrahim@email.com',
      phone: '+234-806-789-0123',
      relationship: 'Father',
      address: '654 Elm Street, Yaba',
      occupation: 'Businessman',
      status: 'Active',
      studentId: 'STU005',
    },
    {
      id: 'PAR007',
      firstName: 'Fatima',
      lastName: 'Ibrahim',
      email: 'fatima.ibrahim@email.com',
      phone: '+234-807-890-1234',
      relationship: 'Mother',
      address: '654 Elm Street, Yaba',
      occupation: 'Civil Servant',
      status: 'Active',
      studentId: 'STU005',
    },
  ];

  classList: ClassInfo[] = [
    {
      id: 'class1',
      className: 'JSS 1A',
      formTeacher: 'Mrs. Sarah Johnson',
      subjects: [
        'Mathematics',
        'English Language',
        'Basic Science',
        'Social Studies',
        'Civic Education',
      ],
    },
    {
      id: 'class2',
      className: 'JSS 2B',
      formTeacher: 'Mr. Michael Brown',
      subjects: [
        'Mathematics',
        'English Language',
        'Basic Science',
        'Social Studies',
        'Computer Studies',
      ],
    },
    {
      id: 'class3',
      className: 'JSS 3A',
      formTeacher: 'Mrs. Jennifer Davis',
      subjects: [
        'Mathematics',
        'English Language',
        'Physics',
        'Chemistry',
        'Biology',
        'Government',
      ],
    },
    {
      id: 'class4',
      className: 'JSS 3B',
      formTeacher: 'Mr. David Wilson',
      subjects: ['Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology', 'Economics'],
    },
  ];

  assignmentsList: Assignment[] = [
    {
      id: 'ASS001',
      title: 'Algebra Worksheet',
      subject: 'Mathematics',
      description: 'Complete exercises 1-20 on quadratic equations',
      dueDate: '2024-10-20',
      status: 'Pending',
      maxScore: 100,
    },
    {
      id: 'ASS002',
      title: 'Essay: My Future Career',
      subject: 'English Language',
      description: 'Write a 500-word essay about your future career aspirations',
      dueDate: '2024-10-15',
      status: 'Submitted',
      maxScore: 50,
      score: 42,
      submissionDate: '2024-10-14',
    },
    {
      id: 'ASS003',
      title: 'Plant Structure Diagram',
      subject: 'Basic Science',
      description: 'Draw and label the parts of a flowering plant',
      dueDate: '2024-10-10',
      status: 'Graded',
      maxScore: 30,
      score: 28,
      submissionDate: '2024-10-09',
    },
  ];

  feesList: Fee[] = [
    {
      id: 'FEE001',
      description: 'Tuition Fee',
      amount: 150000,
      dueDate: '2024-10-01',
      status: 'Paid',
      paidDate: '2024-09-28',
      term: 'First Term',
      session: '2024/2025',
    },
    {
      id: 'FEE002',
      description: 'Development Levy',
      amount: 25000,
      dueDate: '2024-10-01',
      status: 'Paid',
      paidDate: '2024-09-28',
      term: 'First Term',
      session: '2024/2025',
    },
    {
      id: 'FEE003',
      description: 'Sports Fee',
      amount: 10000,
      dueDate: '2024-10-15',
      status: 'Pending',
      term: 'First Term',
      session: '2024/2025',
    },
    {
      id: 'FEE004',
      description: 'Library Fee',
      amount: 5000,
      dueDate: '2024-09-30',
      status: 'Overdue',
      term: 'First Term',
      session: '2024/2025',
    },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.studentId = params['id'];
      this.loadStudentData();
    });
  }

  loadStudentData(): void {
    // Load student data
    this.student = this.studentList.find((s) => s.id === this.studentId) || null;

    if (this.student) {
      // Load class info
      this.classInfo = this.classList.find((c) => c.id === this.student!.classId) || null;

      // Load parents
      this.parents = this.parentList.filter((p) => p.studentId === this.studentId);

      // Load assignments (filter by student's class subjects)
      this.assignments = this.assignmentsList.filter((a) =>
        this.classInfo?.subjects.includes(a.subject)
      );

      // Load fees
      this.fees = this.feesList;
    }
  }

  switchTab(tab: 'overview' | 'assignments' | 'fees' | 'parents'): void {
    this.activeTab = tab;
  }

  goBack(): void {
    this.router.navigate(['/student-management']);
  }

  editStudent(): void {
    // Navigate to edit mode or open edit modal
    console.log('Edit student:', this.student);
  }

  getStudentInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Paid':
      case 'Submitted':
      case 'Graded':
        return 'text-green-600 bg-green-100';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'Overdue':
      case 'Late':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  }

  getTotalFees(): number {
    return this.fees.reduce((total, fee) => total + fee.amount, 0);
  }

  getPaidFees(): number {
    return this.fees
      .filter((fee) => fee.status === 'Paid')
      .reduce((total, fee) => total + fee.amount, 0);
  }

  getPendingFees(): number {
    return this.fees
      .filter((fee) => fee.status === 'Pending' || fee.status === 'Overdue')
      .reduce((total, fee) => total + fee.amount, 0);
  }

  getAssignmentStats(): { total: number; pending: number; submitted: number; graded: number } {
    return {
      total: this.assignments.length,
      pending: this.assignments.filter((a) => a.status === 'Pending').length,
      submitted: this.assignments.filter((a) => a.status === 'Submitted').length,
      graded: this.assignments.filter((a) => a.status === 'Graded').length,
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

  navigateToItem(item: NavItem): void {
    // Update active states
    this.navItems.forEach((navItem) => (navItem.isActive = false));
    item.isActive = true;

    // Handle navigation based on the item
    switch (item.label) {
      case 'Dashboard':
        this.router.navigate(['/dashboard']);
        break;
      case 'School management':
        this.router.navigate(['/session-management']);
        break;
      case 'Students':
        this.router.navigate(['/student-management']);
        break;
      case 'Staffs':
        this.router.navigate(['/staff-management']);
        break;
      case 'Payments':
        this.router.navigate(['/payments']);
        break;
      case 'Transactions':
        this.router.navigate(['/transactions']);
        break;
      case 'Settings':
        this.router.navigate(['/settings']);
        break;
      default:
        console.log('Navigate to:', item.label);
    }
  }

  toggleUserMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout(): void {
    // Handle logout logic
    console.log('Logout clicked');
  }

  printReport(): void {
    // Handle print report logic
    console.log('Print report for student:', this.student?.firstName, this.student?.lastName);
    // You can implement actual print functionality here
    window.print();
  }
}
