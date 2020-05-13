import { TestBed } from '@angular/core/testing';

import { ActualiteServiceService } from './actualite-service.service';

describe('ActualiteServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActualiteServiceService = TestBed.get(ActualiteServiceService);
    expect(service).toBeTruthy();
  });
});
