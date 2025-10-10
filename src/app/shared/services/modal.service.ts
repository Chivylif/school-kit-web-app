import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ModalState {
  isOpen: boolean;
  type: 'login' | 'register' | null;
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalStateSubject = new BehaviorSubject<ModalState>({
    isOpen: false,
    type: null,
    data: null,
  });

  public modalState$ = this.modalStateSubject.asObservable();

  openLoginModal(data?: any) {
    this.modalStateSubject.next({
      isOpen: true,
      type: 'login',
      data,
    });
  }

  openRegisterModal(data?: any) {
    this.modalStateSubject.next({
      isOpen: true,
      type: 'register',
      data,
    });
  }

  closeModal() {
    this.modalStateSubject.next({
      isOpen: false,
      type: null,
      data: null,
    });
  }

  getCurrentState(): ModalState {
    return this.modalStateSubject.value;
  }
}
