import { TestBed } from '@angular/core/testing';

import { ApitesterService } from './apitester.service';

describe('ApitesterService', () => {
  let service: ApitesterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApitesterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
