import { TestBed } from '@angular/core/testing';

import { DfsLigacaoService } from './dfs-ligacao.service';

describe('DfsLigacaoService', () => {
  let service: DfsLigacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DfsLigacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
