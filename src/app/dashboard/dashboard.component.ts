import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import {
  SidebarComponent,
  NavItem,
  UserQuickAction,
  UserMenuLink,
} from '../shared/components/sidebar/sidebar.component';
import {
  ViewProfileModalComponent,
  UserProfile,
} from '../shared/components/view-profile-modal/view-profile-modal.component';
import { ModalService } from '../shared/services/modal.service';

type StatIcon = 'students' | 'staff' | 'payments';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeLabel: string;
  trend: 'up' | 'down';
  icon: StatIcon;
}

interface AdminProfile {
  name: string;
  role: string;
  initials: string;
  bgClass: string;
  image?: string;
}

interface PaymentSeries {
  label: string;
  color: string;
  values: number[];
}

interface RecentPayment {
  fee: string;
  name: string;
  amount: string;
  status: 'Pending' | 'Paid';
}

interface SchoolInfo {
  name: string;
  type: 'Primary' | 'Secondary' | 'Creche';
  currentSession: string;
  currentTerm: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    SidebarComponent,
    HeaderComponent,
    ViewProfileModalComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isSidebarCollapsed = false;
  isMobileSidebarOpen = false;
  isUserMenuOpen = false;
  isLoading = false;
  isProfileModalOpen = false;

  constructor(private router: Router, public modalService: ModalService) {}

  readonly statCards: StatCard[] = [
    {
      title: 'Total No of Students',
      value: '40,689',
      change: '8.5%',
      changeLabel: 'Up from yesterday',
      trend: 'up',
      icon: 'students',
    },
    {
      title: 'Total No of Staff',
      value: '10,293',
      change: '1.3%',
      changeLabel: 'Up from past week',
      trend: 'up',
      icon: 'staff',
    },
    {
      title: 'Total Payments',
      value: '$89,000',
      change: '4.3%',
      changeLabel: 'Down from yesterday',
      trend: 'down',
      icon: 'payments',
    },
  ];

  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', isActive: true },
    { label: 'School management', icon: 'management' },
    { label: 'Payments', icon: 'payments' },
    { label: 'Staffs', icon: 'staffs' },
    { label: 'Students', icon: 'students' },
    { label: 'Settings', icon: 'settings' },
    { label: 'Transactions', icon: 'transactions' },
  ];

  readonly admins: AdminProfile[] = [
    {
      name: 'Mrs. Eneh Victory',
      role: 'Principal',
      initials: 'EV',
      bgClass: 'bg-gradient-to-br from-teal-400 to-emerald-500',
      image: '/img/Image.png',
    },
    {
      name: 'Mr. Maxwell Okundaye',
      role: 'Vice Principal',
      initials: 'MO',
      bgClass: 'bg-gradient-to-br from-sky-400 to-indigo-500',
      image: '/img/Image (1).png',
    },
    {
      name: 'Mr. Derek Okocha',
      role: 'Accountant',
      initials: 'DO',
      bgClass: 'bg-gradient-to-br from-amber-400 to-orange-500',
      image: '/img/Image (2).png',
    },
    {
      name: 'Mrs. Eneh Victory',
      role: 'Principal',
      initials: 'EV',
      bgClass: 'bg-gradient-to-br from-rose-400 to-pink-500',
      image: '/img/Image.png',
    },
    {
      name: 'Mr. Maxwell Okundaye',
      role: 'Vice Principal',
      initials: 'MO',
      bgClass: 'bg-gradient-to-br from-purple-400 to-fuchsia-500',
    },
    {
      name: 'Mr. Derek Okocha',
      role: 'Accountant',
      initials: 'DO',
      bgClass: 'bg-gradient-to-br from-slate-500 to-slate-700',
    },
  ];

  readonly paymentSeries: PaymentSeries[] = [
    {
      label: 'PTA Levy',
      color: 'bg-amber-400',
      values: [10, 22, 18, 25, 24, 28, 40],
    },
    {
      label: 'School Fee',
      color: 'bg-emerald-400',
      values: [6, 12, 20, 32, 28, 33, 26],
    },
  ];

  readonly recentPayments: RecentPayment[] = [
    {
      fee: 'Third term school fees',
      name: 'Patricia Isioma',
      amount: 'NGN 500,000.00',
      status: 'Pending',
    },
    {
      fee: 'Third term school fees',
      name: 'Patricia Isioma',
      amount: 'NGN 500,000.00',
      status: 'Paid',
    },
    {
      fee: 'Third term school fees',
      name: 'Patricia Isioma',
      amount: 'NGN 500,000.00',
      status: 'Pending',
    },
    {
      fee: 'Third term school fees',
      name: 'Patricia Isioma',
      amount: 'NGN 500,000.00',
      status: 'Paid',
    },
    {
      fee: 'Third term school fees',
      name: 'Patricia Isioma',
      amount: 'NGN 500,000.00',
      status: 'Pending',
    },
    {
      fee: 'Third term school fees',
      name: 'Patricia Isioma',
      amount: 'NGN 500,000.00',
      status: 'Paid',
    },
    {
      fee: 'Third term school fees',
      name: 'Patricia Isioma',
      amount: 'NGN 500,000.00',
      status: 'Pending',
    },
    {
      fee: 'Third term school fees',
      name: 'Patricia Isioma',
      amount: 'NGN 500,000.00',
      status: 'Paid',
    },
    {
      fee: 'Third term school fees',
      name: 'Patricia Isioma',
      amount: 'NGN 500,000.00',
      status: 'Pending',
    },
  ];

  readonly schoolInfo: SchoolInfo = {
    name: 'Chrisland Int. School',
    type: 'Secondary',
    currentSession: '2024/2025',
    currentTerm: 'Third Term',
  };

  readonly userQuickActions: UserQuickAction[] = [
    {
      label: 'View profile',
      description: 'Personal information & security',
      icon: 'profile',
    },
    {
      label: 'Account settings',
      description: 'Preferences, language & theme',
      icon: 'settings',
    },
    {
      label: 'Notifications',
      description: 'Alerts and communication rules',
      icon: 'notifications',
    },
  ];

  readonly userMenuLinks: UserMenuLink[] = [
    {
      label: 'Switch school',
      helper: 'Choose from connected campuses',
      icon: 'switch',
    },
    {
      label: 'Help & support',
      helper: 'Knowledge base and contact desk',
      icon: 'support',
    },
    {
      label: 'Log out',
      helper: 'Sign out of this account',
      icon: 'profile',
      isDestructive: true,
    },
  ];

  readonly trackByIndex = (_: number, item: unknown) => item;

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

  @HostListener('document:click')
  handleDocumentClick(): void {
    this.isUserMenuOpen = false;
  }

  @HostListener('document:keydown.escape')
  handleEscapeKey(): void {
    this.isUserMenuOpen = false;
  }

  logout(): void {
    // Handle logout logic here (clear session, tokens, etc.)
    console.log('Logging out...');

    // Show loader
    this.isLoading = true;

    // Simulate logout process with timeout
    setTimeout(() => {
      // Hide loader and navigate back to login page
      this.isLoading = false;
      this.router.navigate(['/auth/login']);
    }, 1500); // 1.5 second delay to show loader
  }

  navigateToItem(item: NavItem): void {
    // Update active states
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

  currentUserProfile: UserProfile = {
    name: 'Patricia Isioma',
    firstName: 'Patricia',
    lastName: 'Isioma',
    email: 'patricia@schoolkit.com',
    role: 'Administrator',
    phone: '+234 802 123 4567',
    address: '123 Education Avenue, Lagos, Nigeria',
    dateJoined: 'January 15, 2024',
    status: 'Active',
    profileImage: '', // Will be set when user uploads an image
    initials: 'PI',
    security: {
      lastPasswordChange: 'October 1, 2025',
      twoFactorEnabled: true,
      lastLogin: 'Today at 2:30 PM',
      loginAttempts: 2,
      accountLocked: false,
    },
  };

  onQuickActionClick(action: UserQuickAction): void {
    if (action.label === 'View profile') {
      this.modalService.openProfileModal(this.currentUserProfile);
    } else {
      console.log('Quick action clicked:', action.label);
    }
  }

  onCloseProfileModal(): void {
    this.modalService.closeModal();
  }

  onEditProfile(): void {
    console.log('Edit profile clicked');
    // You can implement navigation to edit profile page here
    this.modalService.closeModal();
  }

  onPasswordChange(passwordData: { currentPassword: string; newPassword: string }): void {
    console.log('Password change requested');
    // Here you would typically call an API to change the password
    // For now, we'll just simulate the process

    // Simulate API call
    setTimeout(() => {
      console.log('Password changed successfully');
      // Update the last password change date
      if (this.currentUserProfile.security) {
        this.currentUserProfile.security.lastPasswordChange = new Date().toLocaleDateString(
          'en-US',
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }
        );
      }
    }, 2000);
  }

  onToggle2FA(enable: boolean): void {
    console.log(`2FA ${enable ? 'enabled' : 'disabled'}`);
    // Here you would typically call an API to toggle 2FA
    if (this.currentUserProfile.security) {
      this.currentUserProfile.security.twoFactorEnabled = enable;
    }
  }

  onReviewActivity(): void {
    console.log('Review account activity requested');
    // Here you could navigate to an account activity page or open another modal
    // For now, we'll just close the current modal
    this.modalService.closeModal();
  }

  onProfileUpdate(updatedProfile: UserProfile): void {
    console.log('Profile update requested:', updatedProfile);

    // Here you would typically call an API to update the profile
    // For now, we'll simulate the update process
    setTimeout(() => {
      // Update the current user profile with the new data
      Object.assign(this.currentUserProfile, {
        name: updatedProfile.name,
        firstName: updatedProfile.firstName,
        lastName: updatedProfile.lastName,
        email: updatedProfile.email,
        phone: updatedProfile.phone,
        address: updatedProfile.address,
      });

      // Update initials if firstName and lastName are provided
      if (updatedProfile.firstName && updatedProfile.lastName) {
        this.currentUserProfile.initials = `${updatedProfile.firstName.charAt(
          0
        )}${updatedProfile.lastName.charAt(0)}`.toUpperCase();
      }

      console.log('Profile updated successfully');

      // You could show a success message here
      // For example, show a toast notification
    }, 1500);
  }

  onProfileImageUpdate(imageFile: File): void {
    console.log('Profile image update requested:', imageFile);

    // Here you would typically call an API to upload the image
    // For now, we'll simulate the upload process
    const formData = new FormData();
    formData.append('profileImage', imageFile);

    // Simulate image upload
    setTimeout(() => {
      // Create a local URL for the uploaded image (in a real app, this would come from the server)
      const imageUrl = URL.createObjectURL(imageFile);
      this.currentUserProfile.profileImage = imageUrl;

      console.log('Profile image updated successfully');

      // You could show a success message here
      // For example, show a toast notification
    }, 2000);
  }
}
