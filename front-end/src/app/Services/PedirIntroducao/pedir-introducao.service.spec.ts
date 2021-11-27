import { TestBed } from '@angular/core/testing';

import { PedirIntroducaoService } from './pedir-introducao.service';

describe('PedirIntroducaoService', () => {
  let service: PedirIntroducaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedirIntroducaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
