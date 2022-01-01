import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerForcaRelacaoComponent } from './ver-forca-relacao.component';

describe('VerForcaRelacaoComponent', () => {
  let component: VerForcaRelacaoComponent;
  let fixture: ComponentFixture<VerForcaRelacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerForcaRelacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerForcaRelacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
