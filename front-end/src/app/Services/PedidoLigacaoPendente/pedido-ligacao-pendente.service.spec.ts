import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PedidoLigacaoPendenteService } from './pedido-ligacao-pendente.service';
import { HttpClient } from '@angular/common/http';

describe('PedidoLigacaoPendenteService', () => {
  let service: PedidoLigacaoPendenteService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule],
      providers: [
        PedidoLigacaoPendenteService
      ]});
    service = TestBed.inject(PedidoLigacaoPendenteService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
