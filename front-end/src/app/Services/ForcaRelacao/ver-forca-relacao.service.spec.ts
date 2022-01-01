import { TestBed } from '@angular/core/testing';

import { VerForcaRelacaoService } from './ver-forca-relacao.service';

describe('VerForcaRelacaoService', () => {
  let service: VerForcaRelacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerForcaRelacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
