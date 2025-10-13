import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import {
  SidebarComponent,
  NavItem,
  UserQuickAction,
  UserMenuLink,
} from '../shared/components/sidebar/sidebar.component';

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
  imports: [CommonModule, LoaderComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isSidebarCollapsed = false;
  isMobileSidebarOpen = false;
  isUserMenuOpen = false;
  isLoading = false;

  constructor(private router: Router) {}

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

  readonly navItems: NavItem[] = [
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
      label: 'Billing overview',
      helper: 'Invoices, plans & statements',
      icon: 'billing',
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
    if (item.label === 'School management') {
      this.router.navigate(['/session-management']);
    }
    // Add other navigation logic as needed
  }
}
