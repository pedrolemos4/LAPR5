import { TestBed } from '@angular/core/testing';

import { LigacaoService } from './ligacao.service';

describe('LigacaoService', () => {
  let service: LigacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LigacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
