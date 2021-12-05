import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PedidoLigacaoPendenteComponent } from './pedido-ligacao-pendente.component';

describe('PedidoLigacaoPendenteComponent', () => {
  let component: PedidoLigacaoPendenteComponent;
  let fixture: ComponentFixture<PedidoLigacaoPendenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoLigacaoPendenteComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoLigacaoPendenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
