import { TestBed } from '@angular/core/testing';

import { VisitorLogSignalRService } from './visitor-log-signal-r.service';

describe('VisitorLogSignalRService', () => {
  let service: VisitorLogSignalRService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitorLogSignalRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
