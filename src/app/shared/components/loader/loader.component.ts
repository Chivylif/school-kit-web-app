import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
      *ngIf="isLoading"
    >
      <div class="flex flex-col items-center gap-4">
        <!-- Spinner -->
        <div class="relative">
          <div class="h-12 w-12 rounded-full border-4 border-slate-200"></div>
          <div
            class="absolute inset-0 h-12 w-12 animate-spin rounded-full border-4 border-transparent border-t-emerald-600"
          ></div>
        </div>

        <!-- Loading text -->
        <div class="text-center" *ngIf="message">
          <p class="text-sm font-medium text-slate-600">{{ message }}</p>
          <div class="mt-1 flex justify-center space-x-1">
            <div
              class="h-1 w-1 animate-pulse rounded-full bg-emerald-600"
              style="animation-delay: 0ms"
            ></div>
            <div
              class="h-1 w-1 animate-pulse rounded-full bg-emerald-600"
              style="animation-delay: 150ms"
            ></div>
            <div
              class="h-1 w-1 animate-pulse rounded-full bg-emerald-600"
              style="animation-delay: 300ms"
            ></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .animate-spin {
        animation: spin 1s linear infinite;
      }

      .animate-pulse {
        animation: pulse 1.5s ease-in-out infinite;
      }

      @keyframes pulse {
        0%,
        100% {
          opacity: 0.4;
        }
        50% {
          opacity: 1;
        }
      }
    `,
  ],
})
export class LoaderComponent {
  @Input() isLoading: boolean = false;
  @Input() message: string = 'Loading...';
}
