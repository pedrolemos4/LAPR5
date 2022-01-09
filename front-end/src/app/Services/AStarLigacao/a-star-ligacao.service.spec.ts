import { TestBed } from '@angular/core/testing';

import { AStarLigacaoService } from './a-star-ligacao.service';

describe('AStarLigacaoService', () => {
  let service: AStarLigacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AStarLigacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
