import { TestBed } from '@angular/core/testing';

import { CamForteService } from './cam-forte.service';

describe('CamForteService', () => {
  let service: CamForteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CamForteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
