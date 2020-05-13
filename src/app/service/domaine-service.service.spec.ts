import { TestBed } from '@angular/core/testing';

import { DomaineServiceService } from './domaine-service.service';

describe('DomaineServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DomaineServiceService = TestBed.get(DomaineServiceService);
    expect(service).toBeTruthy();
  });
});
