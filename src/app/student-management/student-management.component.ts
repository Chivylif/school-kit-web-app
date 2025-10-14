import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarComponent, NavItem } from '../shared/components/sidebar/sidebar.component';

interface Step {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface StudentData {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: string;
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
  studentId: string;
  firstName: string;
  lastName: string;
  relationship: string;
  email: string;
  phone: string;
  address: string;
  occupation: string;
  status: 'Active' | 'Inactive';
}

interface ClassData {
  id: string;
  className: string;
  noOfStudents: number;
  formTeacher: string;
  capacity: number;
  status: 'Active' | 'Inactive';
  isCompulsory: boolean;
}

interface StudentForm {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  email: string;
  address: string;
  state: string;
  country: string;
  regNo: string;
  dateOfBirth: string;
  classId: string;
  status: 'Active' | 'Inactive';
}

interface ParentForm {
  firstName: string;
  lastName: string;
  relationship: string;
  email: string;
  phone: string;
  address: string;
  occupation: string;
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-student-management',
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './student-management.component.html',
  styleUrl: './student-management.component.css',
})
export class StudentManagementComponent implements OnInit {
  // Make Math available in template
  Math = Math;

  // Tab state
  activeTab: 'students' | 'parents' = 'students';

  // Pagination state
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalItems = 0;

  // Sorting state
  sortBy = 'firstName';
  sortOrder: 'asc' | 'desc' = 'asc';

  // Filter state
  filters: { [key: string]: string } = {};

  // Steps configuration
  steps: Step[] = [
    {
      id: 1,
      title: 'Basic Information',
      description: 'Student personal details',
      completed: false,
    },
    {
      id: 2,
      title: 'Academic & Location',
      description: 'Class and address information',
      completed: false,
    },
    {
      id: 3,
      title: 'Parent Personal Info',
      description: 'Parent/guardian basic details',
      completed: false,
    },
    {
      id: 4,
      title: 'Parent Contact',
      description: 'Contact and address details',
      completed: false,
    },
  ];

  parentSteps: Step[] = [
    {
      id: 1,
      title: 'Personal Information',
      description: 'Basic parent/guardian details',
      completed: false,
    },
    {
      id: 2,
      title: 'Additional Details',
      description: 'Contact and occupation information',
      completed: false,
    },
  ];

  // Modal state
  isStudentModalOpen = false;
  isParentModalOpen = false;
  isEditMode = false;
  currentEditingStudent: StudentData | null = null;
  currentEditingParent: ParentData | null = null;
  currentStudentForParent: StudentData | null = null;

  // Details modal state
  isStudentDetailsModalOpen = false;
  isParentDetailsModalOpen = false;
  selectedStudent: StudentData | null = null;
  selectedParent: ParentData | null = null;

  // Multi-step form state
  studentFormStep = 1;
  parentFormStep = 1;

  // 2-step process state
  isStep2ParentModalOpen = false;
  newlyCreatedStudent: StudentData | null = null;

  // Search and filter state
  searchQuery = '';
  selectedClassFilter = 'All';
  selectedGenderFilter = 'All';
  selectedStatusFilter = 'All';

  // Sidebar properties
  isSidebarCollapsed = false;
  isMobileSidebarOpen = false;

  // Navigation items
  readonly navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', isActive: false },
    { label: 'School management', icon: 'management', isActive: false },
    { label: 'Payments', icon: 'payments', isActive: false },
    { label: 'Staffs', icon: 'staffs', isActive: false },
    { label: 'Students', icon: 'students', isActive: true },
    { label: 'Settings', icon: 'settings', isActive: false },
    { label: 'Transactions', icon: 'transactions', isActive: false },
  ];

  // Student form data
  studentForm: StudentForm = {
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    email: '',
    address: '',
    state: '',
    country: 'Nigeria',
    regNo: '',
    dateOfBirth: '',
    classId: '',
    status: 'Active',
  };

  // Parent form data
  parentForm: ParentForm = {
    firstName: '',
    lastName: '',
    relationship: '',
    email: '',
    phone: '',
    address: '',
    occupation: '',
    status: 'Active',
  };

  // Available classes
  readonly classList: ClassData[] = [
    {
      id: '1',
      className: 'JSS 1A',
      noOfStudents: 25,
      formTeacher: 'Mrs. Sarah Johnson',
      capacity: 30,
      status: 'Active',
      isCompulsory: true,
    },
    {
      id: '2',
      className: 'JSS 1B',
      noOfStudents: 28,
      formTeacher: 'Mr. David Smith',
      capacity: 30,
      status: 'Active',
      isCompulsory: true,
    },
    {
      id: '3',
      className: 'JSS 2A',
      noOfStudents: 22,
      formTeacher: 'Mrs. Emily Brown',
      capacity: 30,
      status: 'Active',
      isCompulsory: true,
    },
    {
      id: '4',
      className: 'JSS 2B',
      noOfStudents: 26,
      formTeacher: 'Mr. Michael Wilson',
      capacity: 30,
      status: 'Active',
      isCompulsory: true,
    },
    {
      id: '5',
      className: 'JSS 3A',
      noOfStudents: 20,
      formTeacher: 'Mrs. Jennifer Davis',
      capacity: 30,
      status: 'Active',
      isCompulsory: true,
    },
  ];

  // Student management data
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
      classId: '1',
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
      classId: '1',
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
      classId: '2',
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
      classId: '2',
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
      classId: '3',
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
      classId: '3',
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
      classId: '4',
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
      classId: '4',
      status: 'Active',
      enrollmentDate: '2024-09-01',
    },
  ];

  parentList: ParentData[] = [
    {
      id: 'PAR001',
      studentId: 'STU001',
      firstName: 'Robert',
      lastName: 'Doe',
      relationship: 'Father',
      email: 'robert.doe@email.com',
      phone: '+234-801-234-5678',
      address: '123 Main Street, Victoria Island',
      occupation: 'Software Engineer',
      status: 'Active',
    },
    {
      id: 'PAR002',
      studentId: 'STU001',
      firstName: 'Mary',
      lastName: 'Doe',
      relationship: 'Mother',
      email: 'mary.doe@email.com',
      phone: '+234-802-345-6789',
      address: '123 Main Street, Victoria Island',
      occupation: 'Teacher',
      status: 'Active',
    },
    {
      id: 'PAR003',
      studentId: 'STU002',
      firstName: 'James',
      lastName: 'Johnson',
      relationship: 'Father',
      email: 'james.johnson@email.com',
      phone: '+234-803-456-7890',
      address: '456 Oak Avenue, Ikoyi',
      occupation: 'Doctor',
      status: 'Active',
    },
    {
      id: 'PAR004',
      studentId: 'STU003',
      firstName: 'Peter',
      lastName: 'Wilson',
      relationship: 'Father',
      email: 'peter.wilson@email.com',
      phone: '+234-804-567-8901',
      address: '789 Pine Road, Lekki',
      occupation: 'Lawyer',
      status: 'Active',
    },
    {
      id: 'PAR005',
      studentId: 'STU004',
      firstName: 'Grace',
      lastName: 'Okeke',
      relationship: 'Mother',
      email: 'grace.okeke@email.com',
      phone: '+234-805-678-9012',
      address: '321 Cedar Street, Surulere',
      occupation: 'Nurse',
      status: 'Active',
    },
  ];

  // Filtered data
  filteredStudents: StudentData[] = [...this.studentList];
  filteredParents: ParentData[] = [...this.parentList];
  paginatedStudents: StudentData[] = [];
  paginatedParents: ParentData[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Subscribe to query parameters
    this.route.queryParams.subscribe((params) => {
      this.parseQueryParams(params);
      this.updateFilteredData();
      this.updatePaginatedData();
    });
  }

  parseQueryParams(params: any): void {
    // Parse pagination parameters
    this.currentPage = parseInt(params['page']) || 1;
    this.pageSize = parseInt(params['pageSize']) || 10;

    // Parse search parameter
    this.searchQuery = params['search'] || '';

    // Parse filter parameters
    this.filters = {};
    Object.keys(params).forEach((key) => {
      if (key.startsWith('filters[') && key.endsWith(']')) {
        const filterKey = key.substring(8, key.length - 1); // Remove 'filters[' and ']'
        this.filters[filterKey] = params[key];
      }
    });

    // Parse sorting parameters
    this.sortBy = params['sort_by'] || 'firstName';
    this.sortOrder = params['sort_order'] === 'desc' ? 'desc' : 'asc';

    // Update filter dropdowns based on parsed filters
    this.selectedClassFilter = this.filters['class'] || 'All';
    this.selectedGenderFilter = this.filters['gender'] || 'All';
    this.selectedStatusFilter = this.filters['status'] || 'All';
  }

  updateQueryParams(): void {
    const queryParams: any = {};

    // Add pagination params
    if (this.currentPage > 1) {
      queryParams.page = this.currentPage;
    }
    if (this.pageSize !== 10) {
      queryParams.pageSize = this.pageSize;
    }

    // Add search param
    if (this.searchQuery) {
      queryParams.search = this.searchQuery;
    }

    // Add filter params
    Object.keys(this.filters).forEach((key) => {
      if (this.filters[key] && this.filters[key] !== 'All') {
        queryParams[`filters[${key}]`] = this.filters[key];
      }
    });

    // Add sorting params
    if (this.sortBy !== 'firstName') {
      queryParams.sort_by = this.sortBy;
    }
    if (this.sortOrder !== 'asc') {
      queryParams.sort_order = this.sortOrder;
    }

    // Navigate with new query parameters
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'replace',
    });
  }

  // Navigation methods
  navigateToItem(item: NavItem): void {
    this.navItems.forEach((navItem) => (navItem.isActive = false));
    item.isActive = true;

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
      default:
        console.log('Navigate to:', item.label);
    }
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

  logout(): void {
    // Handle logout logic here
    console.log('Logout clicked');
    // You can add navigation to login page or clear authentication here
    // this.router.navigate(['/login']);
  }

  // Tab management
  switchTab(tab: 'students' | 'parents'): void {
    this.activeTab = tab;
    this.currentPage = 1; // Reset pagination when switching tabs
    this.updateFilteredData();
    this.updatePaginatedData();
    this.updateQueryParams();
  }

  // Search and filter methods
  updateFilteredData(): void {
    if (this.activeTab === 'students') {
      this.filteredStudents = this.studentList.filter((student) => {
        const matchesSearch =
          student.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          student.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          student.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          student.regNo.toLowerCase().includes(this.searchQuery.toLowerCase());

        const matchesClass =
          this.selectedClassFilter === 'All' || student.classId === this.selectedClassFilter;
        const matchesGender =
          this.selectedGenderFilter === 'All' || student.gender === this.selectedGenderFilter;
        const matchesStatus =
          this.selectedStatusFilter === 'All' || student.status === this.selectedStatusFilter;

        return matchesSearch && matchesClass && matchesGender && matchesStatus;
      });

      // Apply sorting
      this.filteredStudents.sort((a, b) => {
        let aValue: any, bValue: any;

        switch (this.sortBy) {
          case 'firstName':
            aValue = a.firstName.toLowerCase();
            bValue = b.firstName.toLowerCase();
            break;
          case 'lastName':
            aValue = a.lastName.toLowerCase();
            bValue = b.lastName.toLowerCase();
            break;
          case 'email':
            aValue = a.email.toLowerCase();
            bValue = b.email.toLowerCase();
            break;
          case 'enrollmentDate':
            aValue = new Date(a.enrollmentDate);
            bValue = new Date(b.enrollmentDate);
            break;
          case 'dateOfBirth':
            aValue = new Date(a.dateOfBirth);
            bValue = new Date(b.dateOfBirth);
            break;
          default:
            aValue = a.firstName.toLowerCase();
            bValue = b.firstName.toLowerCase();
        }

        if (aValue < bValue) return this.sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return this.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });

      this.totalItems = this.filteredStudents.length;
    } else {
      this.filteredParents = this.parentList.filter((parent) => {
        const matchesSearch =
          parent.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          parent.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          parent.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          this.getStudentName(parent.studentId)
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase());

        return matchesSearch;
      });

      // Apply sorting for parents
      this.filteredParents.sort((a, b) => {
        let aValue: any, bValue: any;

        switch (this.sortBy) {
          case 'firstName':
            aValue = a.firstName.toLowerCase();
            bValue = b.firstName.toLowerCase();
            break;
          case 'lastName':
            aValue = a.lastName.toLowerCase();
            bValue = b.lastName.toLowerCase();
            break;
          case 'email':
            aValue = a.email.toLowerCase();
            bValue = b.email.toLowerCase();
            break;
          default:
            aValue = a.firstName.toLowerCase();
            bValue = b.firstName.toLowerCase();
        }

        if (aValue < bValue) return this.sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return this.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });

      this.totalItems = this.filteredParents.length;
    }

    this.totalPages = Math.ceil(this.totalItems / this.pageSize);

    // Ensure current page is valid
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
  }

  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    if (this.activeTab === 'students') {
      this.paginatedStudents = this.filteredStudents.slice(startIndex, endIndex);
    } else {
      this.paginatedParents = this.filteredParents.slice(startIndex, endIndex);
    }
  }

  onSearch(): void {
    this.currentPage = 1; // Reset to first page when searching
    this.updateFilteredData();
    this.updatePaginatedData();
    this.updateQueryParams();
  }

  onFilterChange(): void {
    // Update filters object
    this.filters = {
      class: this.selectedClassFilter !== 'All' ? this.selectedClassFilter : '',
      gender: this.selectedGenderFilter !== 'All' ? this.selectedGenderFilter : '',
      status: this.selectedStatusFilter !== 'All' ? this.selectedStatusFilter : '',
    };

    this.currentPage = 1; // Reset to first page when filtering
    this.updateFilteredData();
    this.updatePaginatedData();
    this.updateQueryParams();
  }

  onSort(field: string): void {
    if (this.sortBy === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortOrder = 'asc';
    }

    this.updateFilteredData();
    this.updatePaginatedData();
    this.updateQueryParams();
  }

  onPageSizeChange(): void {
    this.currentPage = 1; // Reset to first page when changing page size
    this.updateFilteredData();
    this.updatePaginatedData();
    this.updateQueryParams();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedData();
      this.updateQueryParams();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  getSortIcon(field: string): string {
    if (this.sortBy !== field) return '↕️';
    return this.sortOrder === 'asc' ? '↑' : '↓';
  }

  // Student Management Methods
  createStudent(): void {
    this.isEditMode = false;
    this.studentFormStep = 1;
    this.resetStudentForm();
    this.isStudentModalOpen = true;
  }

  editStudent(student: StudentData): void {
    this.isEditMode = true;
    this.studentFormStep = 1;
    this.currentEditingStudent = student;
    this.populateStudentForm(student);
    this.isStudentModalOpen = true;
  }

  deleteStudent(student: StudentData): void {
    if (confirm(`Are you sure you want to delete ${student.firstName} ${student.lastName}?`)) {
      const index = this.studentList.findIndex((s) => s.id === student.id);
      if (index > -1) {
        this.studentList.splice(index, 1);
        this.updateFilteredData();
      }
    }
  }

  submitStudentForm(): void {
    if (this.isEditMode && this.currentEditingStudent) {
      const updatedStudent: StudentData = {
        ...this.currentEditingStudent,
        ...this.studentForm,
        id: this.currentEditingStudent.id,
        enrollmentDate: this.currentEditingStudent.enrollmentDate,
      };

      const index = this.studentList.findIndex((s) => s.id === this.currentEditingStudent!.id);
      if (index > -1) {
        this.studentList[index] = updatedStudent;
      }
      this.closeStudentModal();
      this.updateFilteredData();
    } else {
      // Create new student - Step 1
      const newStudent: StudentData = {
        ...this.studentForm,
        id: 'STU' + Date.now().toString().slice(-3),
        enrollmentDate: new Date().toISOString().split('T')[0],
      };
      this.studentList.push(newStudent);
      this.newlyCreatedStudent = newStudent;

      // Close step 1 modal and open step 2 (parent modal)
      this.closeStudentModal();
      this.openStep2ParentModal();
      this.updateFilteredData();
    }
  }

  closeStudentModal(): void {
    this.isStudentModalOpen = false;
    this.isEditMode = false;
    this.currentEditingStudent = null;
    this.studentFormStep = 1;
    this.resetStudentForm();
  }

  // Student form step navigation
  nextStudentStep(): void {
    if (this.studentFormStep < 4) {
      this.studentFormStep++;
    }
  }

  previousStudentStep(): void {
    if (this.studentFormStep > 1) {
      this.studentFormStep--;
    }
  }

  getStudentStepTitle(): string {
    switch (this.studentFormStep) {
      case 1:
        return 'Basic Information';
      case 2:
        return 'Academic & Location Information';
      case 3:
        return 'Parent Personal Information';
      case 4:
        return 'Parent Contact & Address';
      default:
        return '';
    }
  }

  handleStudentFormSubmit(): void {
    if (this.studentFormStep < 4) {
      this.nextStudentStep();
    } else {
      this.submitStudentForm();
    }
  }

  openStep2ParentModal(): void {
    this.currentStudentForParent = this.newlyCreatedStudent;
    this.resetParentForm();
    this.isStep2ParentModalOpen = true;
  }

  closeStep2ParentModal(): void {
    this.isStep2ParentModalOpen = false;
    this.currentStudentForParent = null;
    this.newlyCreatedStudent = null;
    this.resetParentForm();
  }

  submitStep2ParentForm(): void {
    if (this.currentStudentForParent) {
      const newParent: ParentData = {
        ...this.parentForm,
        id: 'PAR' + Date.now().toString().slice(-3),
        studentId: this.currentStudentForParent.id,
      };
      this.parentList.push(newParent);
    }
    this.closeStep2ParentModal();
  }

  // Parent Management Methods
  createParent(student?: StudentData): void {
    this.isEditMode = false;
    this.parentFormStep = 1;
    this.currentStudentForParent = student || null;
    this.resetParentForm();
    this.isParentModalOpen = true;
  }

  editParent(parent: ParentData): void {
    this.isEditMode = true;
    this.parentFormStep = 1;
    this.currentEditingParent = parent;
    this.currentStudentForParent = this.studentList.find((s) => s.id === parent.studentId) || null;
    this.populateParentForm(parent);
    this.isParentModalOpen = true;
  }

  deleteParent(parent: ParentData): void {
    if (confirm(`Are you sure you want to delete ${parent.firstName} ${parent.lastName}?`)) {
      const index = this.parentList.findIndex((p) => p.id === parent.id);
      if (index > -1) {
        this.parentList.splice(index, 1);
        this.updateFilteredData();
      }
    }
  }

  submitParentForm(): void {
    if (this.isEditMode && this.currentEditingParent) {
      const updatedParent: ParentData = {
        ...this.currentEditingParent,
        ...this.parentForm,
        id: this.currentEditingParent.id,
        studentId: this.currentEditingParent.studentId,
      };

      const index = this.parentList.findIndex((p) => p.id === this.currentEditingParent!.id);
      if (index > -1) {
        this.parentList[index] = updatedParent;
      }
    } else {
      const newParent: ParentData = {
        ...this.parentForm,
        id: 'PAR' + Date.now().toString().slice(-3),
        studentId: this.currentStudentForParent?.id || '',
      };
      this.parentList.push(newParent);
    }
    this.closeParentModal();
    this.updateFilteredData();
  }

  closeParentModal(): void {
    this.isParentModalOpen = false;
    this.isEditMode = false;
    this.currentEditingParent = null;
    this.currentStudentForParent = null;
    this.parentFormStep = 1;
    this.resetParentForm();
  }

  // Parent form step navigation
  nextParentStep(): void {
    if (this.parentFormStep < 2) {
      this.parentFormStep++;
    }
  }

  previousParentStep(): void {
    if (this.parentFormStep > 1) {
      this.parentFormStep--;
    }
  }

  getParentStepTitle(): string {
    switch (this.parentFormStep) {
      case 1:
        return 'Personal Information';
      case 2:
        return 'Additional Details';
      default:
        return '';
    }
  }

  handleParentFormSubmit(): void {
    if (this.parentFormStep < 2) {
      this.nextParentStep();
    } else {
      this.submitParentForm();
    }
  }

  // Helper methods
  getStudentParents(studentId: string): ParentData[] {
    return this.parentList.filter((parent) => parent.studentId === studentId);
  }

  getStudentName(studentId: string): string {
    const student = this.studentList.find((s) => s.id === studentId);
    return student ? `${student.firstName} ${student.lastName}` : 'Unknown Student';
  }

  getClassName(classId: string): string {
    const classData = this.classList.find((c) => c.id === classId);
    return classData ? classData.className : 'Unknown Class';
  }

  getStudentsByClass(classId: string): StudentData[] {
    return this.studentList.filter((student) => student.classId === classId);
  }

  getStudentInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }

  // Form helpers
  private resetStudentForm(): void {
    this.studentForm = {
      firstName: '',
      middleName: '',
      lastName: '',
      gender: '',
      email: '',
      address: '',
      state: '',
      country: 'Nigeria',
      regNo: '',
      dateOfBirth: '',
      classId: '',
      status: 'Active',
    };
  }

  private populateStudentForm(student: StudentData): void {
    this.studentForm = {
      firstName: student.firstName,
      middleName: student.middleName || '',
      lastName: student.lastName,
      gender: student.gender,
      email: student.email,
      address: student.address,
      state: student.state,
      country: student.country,
      regNo: student.regNo,
      dateOfBirth: student.dateOfBirth,
      classId: student.classId,
      status: student.status,
    };
  }

  private resetParentForm(): void {
    this.parentForm = {
      firstName: '',
      lastName: '',
      relationship: '',
      email: '',
      phone: '',
      address: '',
      occupation: '',
      status: 'Active',
    };
  }

  private populateParentForm(parent: ParentData): void {
    this.parentForm = {
      firstName: parent.firstName,
      lastName: parent.lastName,
      relationship: parent.relationship,
      email: parent.email,
      phone: parent.phone,
      address: parent.address,
      occupation: parent.occupation,
      status: parent.status,
    };
  }

  // Computed properties
  get totalActiveStudents(): number {
    return this.studentList.filter((s) => s.status === 'Active').length;
  }

  get totalParents(): number {
    return this.parentList.length;
  }

  get studentsPerClass(): { [key: string]: number } {
    const counts: { [key: string]: number } = {};
    this.studentList.forEach((student) => {
      counts[student.classId] = (counts[student.classId] || 0) + 1;
    });
    return counts;
  }

  get maleStudentsCount(): number {
    return this.studentList.filter((s) => s.gender === 'Male' && s.status === 'Active').length;
  }

  get femaleStudentsCount(): number {
    return this.studentList.filter((s) => s.gender === 'Female' && s.status === 'Active').length;
  }

  // Step management helpers
  getCurrentStep(): Step {
    return this.steps[this.studentFormStep - 1] || this.steps[0];
  }

  getCurrentParentStep(): Step {
    return this.parentSteps[this.parentFormStep - 1] || this.parentSteps[0];
  }

  isStepCompleted(stepId: number): boolean {
    return stepId < this.studentFormStep;
  }

  isStepActive(stepId: number): boolean {
    return stepId === this.studentFormStep;
  }

  isParentStepCompleted(stepId: number): boolean {
    return stepId < this.parentFormStep;
  }

  isParentStepActive(stepId: number): boolean {
    return stepId === this.parentFormStep;
  }

  trackByIndex = (_: number, item: unknown) => item;

  // Student Details Modal Methods
  viewStudentDetails(student: StudentData): void {
    console.log('viewStudentDetails called with:', student);
    this.selectedStudent = student;
    this.isStudentDetailsModalOpen = true;
    console.log('isStudentDetailsModalOpen set to:', this.isStudentDetailsModalOpen);
  }

  closeStudentDetailsModal(): void {
    this.isStudentDetailsModalOpen = false;
    this.selectedStudent = null;
  }

  // Parent Details Modal Methods
  viewParentDetails(parent: ParentData): void {
    console.log('viewParentDetails called with:', parent);
    this.selectedParent = parent;
    this.isParentDetailsModalOpen = true;
    console.log('isParentDetailsModalOpen set to:', this.isParentDetailsModalOpen);
  }

  closeParentDetailsModal(): void {
    this.isParentDetailsModalOpen = false;
    this.selectedParent = null;
  }

  // Helper method to view student details from parent modal
  viewStudentDetailsFromParent(student: StudentData): void {
    this.closeParentDetailsModal();
    this.viewStudentDetails(student);
  }

  // Helper methods for student details modal
  getFormTeacher(classId: string): string {
    // Mock data - replace with actual form teacher data
    const formTeachers: { [key: string]: string } = {
      class1: 'Mrs. Sarah Johnson',
      class2: 'Mr. Michael Brown',
      class3: 'Ms. Emily Davis',
      class4: 'Mr. James Wilson',
      class5: 'Mrs. Lisa Anderson',
    };
    return formTeachers[classId] || 'Not Assigned';
  }

  getStudentSubjects(classId: string): string[] {
    // Mock data - replace with actual subject data based on class
    const subjectsByClass: { [key: string]: string[] } = {
      class1: [
        'Mathematics',
        'English Language',
        'Basic Science',
        'Social Studies',
        'Computer Studies',
      ],
      class2: ['Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology', 'Geography'],
      class3: ['Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology', 'Government'],
      class4: ['Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology', 'Economics'],
      class5: ['Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology', 'Literature'],
    };
    return subjectsByClass[classId] || ['No subjects assigned'];
  }

  getParentChildren(parentId: string): StudentData[] {
    // Find all students that have this parent
    const parentData = this.parentList.find((p) => p.id === parentId);
    if (!parentData) return [];

    // For now, we'll return the single student associated with this parent
    // In a more complex system, you might have a many-to-many relationship
    const student = this.studentList.find((s) => s.id === parentData.studentId);
    return student ? [student] : [];
  }

  // Navigate to full student details page
  viewStudentFullDetails(student: StudentData): void {
    this.closeStudentDetailsModal();
    this.router.navigate(['/student', student.id]);
  }
}
