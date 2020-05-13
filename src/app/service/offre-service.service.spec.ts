import { TestBed } from '@angular/core/testing';

import { OffreServiceService } from './offre-service.service';

describe('OffreServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OffreServiceService = TestBed.get(OffreServiceService);
    expect(service).toBeTruthy();
  });
});
