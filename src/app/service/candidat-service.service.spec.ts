import { TestBed } from '@angular/core/testing';

import { CandidatServiceService } from './candidat-service.service';

describe('CandidatServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CandidatServiceService = TestBed.get(CandidatServiceService);
    expect(service).toBeTruthy();
  });
});
