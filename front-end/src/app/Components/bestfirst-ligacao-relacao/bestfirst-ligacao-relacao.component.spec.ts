import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestfirstLigacaoRelacaoComponent } from './bestfirst-ligacao-relacao.component';

describe('BestfirstLigacaoRelacaoComponent', () => {
  let component: BestfirstLigacaoRelacaoComponent;
  let fixture: ComponentFixture<BestfirstLigacaoRelacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestfirstLigacaoRelacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestfirstLigacaoRelacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
