import { TestBed } from '@angular/core/testing';

import { InscriptionServiceService } from './inscription-service.service';

describe('InscriptionServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InscriptionServiceService = TestBed.get(InscriptionServiceService);
    expect(service).toBeTruthy();
  });
});
