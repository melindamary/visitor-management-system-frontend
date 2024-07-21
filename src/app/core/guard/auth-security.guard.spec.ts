import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authSecurityGuard } from './auth-security.guard';

describe('authSecurityGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authSecurityGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
