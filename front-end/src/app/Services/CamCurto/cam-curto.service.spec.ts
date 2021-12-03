import { TestBed } from '@angular/core/testing';

import { CamCurtoService } from './cam-curto.service';

describe('CamCurtoService', () => {
  let service: CamCurtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CamCurtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
