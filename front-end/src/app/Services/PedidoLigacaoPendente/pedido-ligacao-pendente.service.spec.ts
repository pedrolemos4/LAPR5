import { TestBed } from '@angular/core/testing';

import { PedidoLigacaoPendenteService } from './pedido-ligacao-pendente.service';

describe('PedidoLigacaoPendenteService', () => {
  let service: PedidoLigacaoPendenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidoLigacaoPendenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
