import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-base',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      [class.opacity-0]="!isVisible"
      [class.opacity-100]="isVisible"
      [class.pointer-events-none]="!isVisible"
      style="transition: opacity 300ms ease-in-out"
      (click)="onBackdropClick($event)"
    >
      <div
        class="relative bg-white rounded-2xl shadow-2xl w-full overflow-hidden transform transition-all duration-300"
        [class]="
          'relative bg-white rounded-2xl shadow-2xl w-full overflow-hidden transform transition-all duration-300 ' +
          modalSizeClass +
          ' ' +
          modalHeightClass
        "
        [class.scale-95]="!isVisible"
        [class.scale-100]="isVisible"
        [class.translate-y-4]="!isVisible"
        [class.translate-y-0]="isVisible"
        (click)="$event.stopPropagation()"
      >
        <!-- Close button -->
        <button
          *ngIf="showCloseButton"
          type="button"
          (click)="close()"
          class="absolute top-4 right-4 z-10 h-10 w-10 grid place-content-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Modal content -->
        <div class="relative h-full">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class ModalBaseComponent {
  @Input() isVisible: boolean = false;
  @Input() showCloseButton: boolean = true;
  @Input() closeOnBackdropClick: boolean = true;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'lg';
  @Output() modalClose = new EventEmitter<void>();

  get modalSizeClass(): string {
    const sizeClasses = {
      sm: 'max-w-md',
      md: 'max-w-2xl',
      lg: 'max-w-4xl',
      xl: 'max-w-6xl',
    };
    return sizeClasses[this.size];
  }

  get modalHeightClass(): string {
    const heightClasses = {
      sm: 'max-h-[80vh]',
      md: 'max-h-[85vh]',
      lg: 'max-h-[90vh]',
      xl: 'max-h-[95vh]',
    };
    return heightClasses[this.size];
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: Event) {
    if (this.isVisible) {
      this.close();
    }
  }

  onBackdropClick(event: MouseEvent) {
    if (this.closeOnBackdropClick && event.target === event.currentTarget) {
      this.close();
    }
  }

  close() {
    this.modalClose.emit();
  }
}
