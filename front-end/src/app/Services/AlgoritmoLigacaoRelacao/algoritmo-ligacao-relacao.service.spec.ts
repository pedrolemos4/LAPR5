import { TestBed } from '@angular/core/testing';

import { AlgoritmoLigacaoRelacaoService } from './algoritmo-ligacao-relacao.service';

describe('AlgoritmoLigacaoRelacaoService', () => {
  let service: AlgoritmoLigacaoRelacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgoritmoLigacaoRelacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
