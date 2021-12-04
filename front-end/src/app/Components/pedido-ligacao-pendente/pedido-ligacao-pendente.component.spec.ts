import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoLigacaoPendenteComponent } from './pedido-ligacao-pendente.component';

describe('PedidoLigacaoPendenteComponent', () => {
  let component: PedidoLigacaoPendenteComponent;
  let fixture: ComponentFixture<PedidoLigacaoPendenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidoLigacaoPendenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoLigacaoPendenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
