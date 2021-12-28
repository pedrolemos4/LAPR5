import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaminhoDiferenciadoComponent } from './caminho-diferenciado.component';

describe('CaminhoDiferenciadoComponent', () => {
  let component: CaminhoDiferenciadoComponent;
  let fixture: ComponentFixture<CaminhoDiferenciadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaminhoDiferenciadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaminhoDiferenciadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
