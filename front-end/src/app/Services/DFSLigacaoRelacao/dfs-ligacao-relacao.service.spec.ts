import { TestBed } from '@angular/core/testing';

import { DfsLigacaoRelacaoService } from './dfs-ligacao-relacao.service';

describe('DfsLigacaoRelacaoService', () => {
  let service: DfsLigacaoRelacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DfsLigacaoRelacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
