import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserQuickAction, UserMenuLink } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() isSidebarCollapsed = false;
  @Input() isUserMenuOpen = false;
  @Input() userQuickActions: UserQuickAction[] = [];
  @Input() userMenuLinks: UserMenuLink[] = [];
  @Input() userName = '';
  @Input() userRole = '';
  @Input() userInitials = '';
  @Input() userProfileImage = '';
  @Input() userEmail = '';

  @Output() toggleMobileSidebar = new EventEmitter<void>();
  @Output() toggleSidebarCollapse = new EventEmitter<void>();
  @Output() toggleUserMenu = new EventEmitter<MouseEvent>();
  @Output() closeUserMenu = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();
  @Output() quickActionClick = new EventEmitter<UserQuickAction>();

  readonly trackByIndex = (_: number, item: unknown) => item;

  onToggleMobileSidebar(): void {
    this.toggleMobileSidebar.emit();
  }

  onToggleSidebarCollapse(): void {
    this.toggleSidebarCollapse.emit();
  }

  onToggleUserMenu(event: MouseEvent): void {
    this.toggleUserMenu.emit(event);
  }

  onCloseUserMenu(): void {
    this.closeUserMenu.emit();
  }

  onLogout(): void {
    this.logout.emit();
  }

  onQuickActionClick(action: UserQuickAction): void {
    this.quickActionClick.emit(action);
    this.onCloseUserMenu();
  }
}
