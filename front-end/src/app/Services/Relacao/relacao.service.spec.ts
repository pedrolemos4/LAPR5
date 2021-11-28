import { TestBed } from '@angular/core/testing';

import { RelacaoService } from './relacao.service';

describe('RelacaoService', () => {
  let service: RelacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
