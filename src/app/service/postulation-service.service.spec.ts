import { TestBed } from '@angular/core/testing';

import { PostulationServiceService } from './postulation-service.service';

describe('PostulationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostulationServiceService = TestBed.get(PostulationServiceService);
    expect(service).toBeTruthy();
  });
});
