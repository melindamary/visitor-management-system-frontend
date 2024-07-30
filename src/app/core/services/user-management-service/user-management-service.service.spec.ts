import { TestBed } from '@angular/core/testing';

import { UserManagementServiceService } from './user-management-service.service';

describe('UserManagementServiceService', () => {
  let service: UserManagementServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserManagementServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
