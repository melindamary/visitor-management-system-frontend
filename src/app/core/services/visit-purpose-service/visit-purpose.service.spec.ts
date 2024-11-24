import { TestBed } from '@angular/core/testing';

import { VisitPurposeService } from './visit-purpose.service';

describe('VisitPurposeService', () => {
  let service: VisitPurposeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitPurposeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
