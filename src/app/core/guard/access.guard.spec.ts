import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { accessGuardGuard } from './access.guard';

describe('accessGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => accessGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
