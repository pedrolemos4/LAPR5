import { TestBed } from '@angular/core/testing';

import { CaminhoDiferenciadoService } from './caminho-diferenciado.service';

describe('CaminhoDiferenciadoService', () => {
  let service: CaminhoDiferenciadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaminhoDiferenciadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
