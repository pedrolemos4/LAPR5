import { TestBed } from '@angular/core/testing';

import { BestfirstLigacaoRelacaoService } from './bestfirst-ligacao-relacao.service';

describe('BestfirstLigacaoRelacaoService', () => {
  let service: BestfirstLigacaoRelacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BestfirstLigacaoRelacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
