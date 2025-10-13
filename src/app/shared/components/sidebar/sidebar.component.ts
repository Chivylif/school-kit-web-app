import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export type NavIcon =
  | 'dashboard'
  | 'management'
  | 'payments'
  | 'staffs'
  | 'students'
  | 'settings'
  | 'transactions';

export interface NavItem {
  label: string;
  icon: NavIcon;
  isActive?: boolean;
}

export interface UserQuickAction {
  label: string;
  description: string;
  icon: string;
}

export interface UserMenuLink {
  label: string;
  helper: string;
  icon: string;
  isDestructive?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() navItems: NavItem[] = [];
  @Input() isSidebarCollapsed = false;
  @Input() isMobileSidebarOpen = false;
  @Input() userQuickActions: UserQuickAction[] = [];
  @Input() userMenuLinks: UserMenuLink[] = [];
  @Input() schoolName = 'Chrisland Int. School';
  @Input() schoolCampus = 'Main campus';
  @Input() userInitials = 'JD';
  @Input() userName = 'Patricia Onyema';
  @Input() userRole = 'Administrator';
  @Input() userEmail = 'patricia@schoolkit.com';

  @Output() toggleSidebarCollapse = new EventEmitter<void>();
  @Output() closeMobileSidebar = new EventEmitter<void>();
  @Output() navigateToItem = new EventEmitter<NavItem>();
  @Output() logout = new EventEmitter<void>();

  isUserMenuOpen = false;

  constructor(private router: Router) {}

  readonly trackByIndex = (_: number, item: unknown) => item;

  onToggleSidebarCollapse(): void {
    this.toggleSidebarCollapse.emit();
  }

  onCloseMobileSidebar(): void {
    this.closeMobileSidebar.emit();
  }

  onNavigateToItem(item: NavItem): void {
    this.navigateToItem.emit(item);
    this.onCloseMobileSidebar();
  }

  toggleUserMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeUserMenu(): void {
    this.isUserMenuOpen = false;
  }

  onLogout(): void {
    this.logout.emit();
    this.closeUserMenu();
  }

  @HostListener('document:click')
  handleDocumentClick(): void {
    this.isUserMenuOpen = false;
  }

  @HostListener('document:keydown.escape')
  handleEscapeKey(): void {
    this.isUserMenuOpen = false;
  }
}
