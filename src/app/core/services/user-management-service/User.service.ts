import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }


  private userId: number | null = null;

  setUserId(id: number): void {
    this.userId = id;
  }

  getUserId(): number | null {
    return this.userId;
  }

  clearUserId(): void {
    this.userId = null;
  }
}
