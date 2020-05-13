import { TestBed } from '@angular/core/testing';

import { EntrepriseServiceService } from './entreprise-service.service';

describe('EntrepriseServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntrepriseServiceService = TestBed.get(EntrepriseServiceService);
    expect(service).toBeTruthy();
  });
});
