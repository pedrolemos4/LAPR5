import { TestBed } from '@angular/core/testing';

import { BestfirstLigacaoService } from './bestfirst-ligacao.service';

describe('BestfirstLigacaoService', () => {
  let service: BestfirstLigacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BestfirstLigacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
