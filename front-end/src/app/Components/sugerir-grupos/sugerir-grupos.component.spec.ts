import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugerirGruposComponent } from './sugerir-grupos.component';

describe('SugerirGruposComponent', () => {
  let component: SugerirGruposComponent;
  let fixture: ComponentFixture<SugerirGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SugerirGruposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SugerirGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
