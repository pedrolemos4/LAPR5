import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestfirstLigacaoComponent } from './bestfirst-ligacao.component';

describe('BestfirstLigacaoComponent', () => {
  let component: BestfirstLigacaoComponent;
  let fixture: ComponentFixture<BestfirstLigacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestfirstLigacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestfirstLigacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
