import { TestBed } from '@angular/core/testing';
import { AuthAdminGuard } from './auth-admin.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth-service/auth.service';

describe('AuthAdminGuard', () => {
  let guard: AuthAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthAdminGuard, AuthService]  // Provide any dependencies here
    });
    guard = TestBed.inject(AuthAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // Add more tests as needed
});
