import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAmigosGruposComponent } from './ver-amigos-grupos.component';

describe('VerAmigosGruposComponent', () => {
  let component: VerAmigosGruposComponent;
  let fixture: ComponentFixture<VerAmigosGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerAmigosGruposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAmigosGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
