import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authAceGuard } from './auth-ace.guard';

describe('authAceGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authAceGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
