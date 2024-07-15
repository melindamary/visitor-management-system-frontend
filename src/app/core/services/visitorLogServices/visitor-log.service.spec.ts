import { TestBed } from '@angular/core/testing';

import { VisitorLogService } from './visitor-log.service';

describe('VisitorLogService', () => {
  let service: VisitorLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitorLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
