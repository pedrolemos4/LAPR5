import { TestBed } from '@angular/core/testing';

import { TamRedeService } from './tam-rede.service';

describe('TamRedeService', () => {
  let service: TamRedeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TamRedeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
