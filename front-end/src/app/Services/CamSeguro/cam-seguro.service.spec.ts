import { TestBed } from '@angular/core/testing';

import { CamSeguroService } from './cam-seguro.service';

describe('CamSeguroService', () => {
  let service: CamSeguroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CamSeguroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
