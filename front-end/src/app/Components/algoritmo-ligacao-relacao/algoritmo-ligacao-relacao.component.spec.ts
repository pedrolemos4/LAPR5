import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoritmoLigacaoRelacaoComponent } from './algoritmo-ligacao-relacao.component';

describe('AlgoritmoLigacaoRelacaoComponent', () => {
  let component: AlgoritmoLigacaoRelacaoComponent;
  let fixture: ComponentFixture<AlgoritmoLigacaoRelacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgoritmoLigacaoRelacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoritmoLigacaoRelacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
