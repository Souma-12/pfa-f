import { TestBed } from '@angular/core/testing';

import { LangueServiceService } from './langue-service.service';

describe('LangueServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LangueServiceService = TestBed.get(LangueServiceService);
    expect(service).toBeTruthy();
  });
});
